#include "mainwindow.h"
#include "ui_mainwindow.h"
#include <iostream>

#include <QGridLayout>
#include <QDialog>
#include <QInputDialog>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{


    scale = 20;

    getLines();

    ui->setupUi(this);

    scene = new View(this);
    view = new QGraphicsView(scene);
    ui->gridLayout->addWidget(view);

    linesPen.setColor(Qt::red);
    linesPen.setWidth(2);

    MainRectPen.setColor(Qt::blue);
    MainRectPen.setWidth(3);
    ui->spinBox->setValue(10);
    ui->spinBox->setMinimum(1);

    for(auto now : lines) {
        scene->addLine(now, linesPen);
    }

    isRect = 1;

    int x1 = -200/20*scale, y1 = -200/20*scale, x2 = 200/20*scale, y2 = 200/20*scale;
    xmin = x1;
    xmax = x2;
    ymin = y1;
    ymax = y2;
    MainRect.setRect(x1,y1,x2-x1,y2-y1);
    scene->setSceneRect(MainRect);
    scene->addRect(MainRect, MainRectPen);

    for(auto now : lines) {
        cutLine(now);
    }
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::getLines()
{

}

void MainWindow::cutLine(QLine line)
{

    int x1 = line.x1();
    int y1 = line.y1();
    int x2 = line.x2();
    int y2 = line.y2();

    int xx1,xx2,yy1,yy2,dx,dy;
    float t1,t2,p[4],q[4],temp;
    dx=x2-x1;
    dy=y2-y1;

    p[0]=-dx;
    p[1]=dx;
    p[2]=-dy;
    p[3]=dy;

    q[0]=x1-xmin;
    q[1]=xmax-x1;
    q[2]=y1-ymin;
    q[3]=ymax-y1;

    for(int i=0;i<4;i++) {
        if(p[i]==0) {
            if(q[i]>=0) {
                if(i<2) {
                    if(y1<ymin) {
                        y1=ymin;
                    }
                    if(y2>ymax) {
                        y2=ymax;
                    }
                }
                if(i>1) {
                    if(x1<xmin) {
                        x1=xmin;
                    }

                    if(x2>xmax) {
                        x2=xmax;
                    }
                }
            }
        }
    }

    t1=0;
    t2=1;

    for(int i=0;i<4;i++) {
        temp=q[i]/p[i];
        if(p[i]<0) {
            if(t1<=temp) {
                t1=temp;
            }
        }
        else {
            if(t2>temp) {
                t2=temp;
            }
        }
    }

    if(t1<t2) {
        xx1 = x1 + t1 * p[1];
        xx2 = x1 + t2 * p[1];
        yy1 = y1 + t1 * p[3];
        yy2 = y1 + t2 * p[3];
        cutLines.push_back({xx1,yy1,xx2,yy2});
    }
}

using namespace std;

int dot(pair<int, int> p0, pair<int, int> p1)
{
    return p0.first * p1.first + p0.second * p1.second;
}

float max(vector<float> t)
{
    float maximum = INT_MIN;
    for (int i = 0; i < t.size(); i++) {
        if (t[i] > maximum) {
            maximum = t[i];
        }
    }
    return maximum;
}

float min(vector<float> t)
{
    float minimum = INT_MAX;
    for (int i = 0; i < t.size(); i++) {
        if (t[i] < minimum) {
            minimum = t[i];
        }
    }
    return minimum;
}

void MainWindow::cutLinePolygon(QLine l)
{

    int n = MainPolygon.size();

    vector <pair<int,int> > vertices;
    for(int i=0;i<n;i++) {
        vertices.push_back({MainPolygon.point(i).x(), MainPolygon.point(i).y()});
    }

    vector <pair<int,int> > line;

    line.push_back({l.x1(), l.y1()});
    line.push_back({l.x2(), l.y2()});

    pair<int, int>* newPair = new pair<int, int>[2];
    pair<int, int>* normal = new pair<int, int>[n];

   for (int i = 0; i < n; i++) {
       normal[i].second = vertices[(i + 1) % n].first - vertices[i].first;
       normal[i].first = vertices[i].second - vertices[(i + 1) % n].second;
   }

   pair<int, int> P1_P0 = make_pair(line[1].first - line[0].first, line[1].second - line[0].second);

   pair<int, int>* P0_PEi = new pair<int, int>[n];

   for (int i = 0; i < n; i++) {
       P0_PEi[i].first = vertices[i].first - line[0].first;
       P0_PEi[i].second = vertices[i].second - line[0].second;
   }

   int *numerator = new int[n], *denominator = new int[n];

   for (int i = 0; i < n; i++) {
       numerator[i] = dot(normal[i], P0_PEi[i]);
       denominator[i] = dot(normal[i], P1_P0);
   }

   float* t = new float[n];

   vector<float> tE, tL;

   for (int i = 0; i < n; i++) {

       t[i] = (float)(numerator[i]) / (float)(denominator[i]);

       if (denominator[i] > 0)
           tE.push_back(t[i]);
       else
           tL.push_back(t[i]);
   }

   float temp[2];

   tE.push_back(0.f);
   temp[0] = max(tE);

   tL.push_back(1.f);
   temp[1] = min(tL);

   if (temp[0] > temp[1]) {
       newPair[0] = make_pair(-1, -1);
       newPair[1] = make_pair(-1, -1);
       return;
   }

   newPair[0].first = (float)line[0].first + (float)P1_P0.first * (float)temp[0];
   newPair[0].second = (float)line[0].second + (float)P1_P0.second * (float)temp[0];
   newPair[1].first = (float)line[0].first + (float)P1_P0.first * (float)temp[1];
   newPair[1].second = (float)line[0].second + (float)P1_P0.second * (float)temp[1];

   cutLines.push_back({newPair[0].first, newPair[0].second, newPair[1].first, newPair[1].second});


}

void MainWindow::paintEvent(QPaintEvent *)
{
    QPainter p(this);
    p.drawText(view->width()/2+15,height()-3, "y");
    p.drawText(view->width()+12, height()/2-2, "x");
}

void MainWindow::on_checkBox_stateChanged(int arg1)
{
    cutLines.clear();
    for(auto now : lines) {
        if(isRect) cutLine(now); else cutLinePolygon(now);
    }
    if(ui->checkBox->isChecked()) {
        scene->clear();
        if(isRect) scene->addRect(MainRect, MainRectPen);
            else scene->addPolygon(MainPolygon, MainRectPen);
        for(auto now : cutLines) {
            scene->addLine(now, linesPen);
        }
    } else {
        scene->clear();
        if(isRect) scene->addRect(MainRect, MainRectPen);
            else scene->addPolygon(MainPolygon, MainRectPen);
        for(auto now : lines) {
            scene->addLine(now, linesPen);
        }
    }
}

void MainWindow::on_pushButton_clicked()
{
    int x1 = QInputDialog::getInt(this, "New line", "Enter x_start") * scale;
    int y1 = QInputDialog::getInt(this, "New line", "Enter y_start") * scale;
    int x2 = QInputDialog::getInt(this, "New line", "Enter x_end") * scale;
    int y2 = QInputDialog::getInt(this, "New line", "Enter y_end") * scale;
    lines.push_back({x1,y1,x2,y2});

    emit on_checkBox_stateChanged(1);

}

void MainWindow::on_pushButton_2_clicked()
{
    xmin = QInputDialog::getInt(this, "New Rectangle", "Enter x_start") * scale;
    ymin = QInputDialog::getInt(this, "New Rectangle", "Enter y_start") * scale;
    xmax = QInputDialog::getInt(this, "New Rectangle", "Enter x_end") * scale;
    ymax = QInputDialog::getInt(this, "New Rectangle", "Enter y_end") * scale;
    MainRect.setRect(xmin,ymin, xmax-xmin, ymax-ymin);
    isRect = 1;
    emit on_checkBox_stateChanged(1);
}

void MainWindow::on_pushButton_3_clicked()
{
    int n = QInputDialog::getInt(this, "New Polygon", "Enter sides count", 4, 4);

    int points[2*n];
    for(int i=0;i<2 * n;i+=2) {
        int x = QInputDialog::getInt(this, "New Polygon", "Enter next x") * scale;
        int y = QInputDialog::getInt(this, "New Polygon", "Enter next y") * scale;
        points[i] = x;
        points[i+1] = y;
    }
    MainPolygon.setPoints(n, points);
    scene->addPolygon(MainPolygon);

    isRect = 0;
    emit on_checkBox_stateChanged(1);
}

void MainWindow::on_spinBox_valueChanged(int arg1)
{
    int x = ui->spinBox->value() * 2;
    for(auto& now : lines) {
        now.setLine(now.x1()/scale*x,now.y1()/scale*x,now.x2()/scale*x,now.y2()/scale*x);
    }
    xmin = xmin/scale*x;
    ymin = ymin/scale*x;
    xmax = xmax/scale*x;
    ymax = ymax/scale*x;
    if(isRect) {
        MainRect.setRect(xmin,ymin,xmax-xmin,ymax-ymin);
    } else {
        for(auto& now : MainPolygon) {
            now/=scale;
            now*=x;
        }
    }


    scale = ui->spinBox->value() * 2;
    emit on_checkBox_stateChanged(1);
}
