#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>

#include <QDialog>
#include <QtCore>
#include <QtGui>
#include <QGraphicsScene>
#include <QGraphicsView>

#include <view.h>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT


public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();
    void getLines();
    void cutLine(QLine);
    void cutLinePolygon(QLine);

protected:
    void paintEvent(QPaintEvent*) override;

private slots:
    void on_checkBox_stateChanged(int arg1);

    void on_pushButton_clicked();

    void on_pushButton_2_clicked();

    void on_pushButton_3_clicked();

    void on_spinBox_valueChanged(int arg1);

private:
    Ui::MainWindow *ui;

    QGraphicsView* view;
    QGraphicsScene* scene;
    QRect MainRect;
    QPolygon MainPolygon;
    bool isRect;
    QPen linesPen, MainRectPen;
    std::vector <QLine> lines;
    std::vector <QLine> cutLines;
    int n;
    int xmin,ymin,xmax,ymax;
    int scale;


};
#endif // MAINWINDOW_H
