#include "view.h"

#include <QPainter>
#include <cmath>
#include <QGraphicsView>
#include <QDebug>


View::View(QObject *parent, int scl) : QGraphicsScene(parent), gridSize(20)
{
    Q_ASSERT(gridSize > 0);
    scaleOne = scl;
}

void View::drawBackground(QPainter *painter, const QRectF &rect)
{
    QPen p;
    p.setWidthF(0.1f);
    painter->setPen(p);
    qreal left = int(rect.left()) - (int(rect.left()) % gridSize);
    qreal top = int(rect.top()) - (int(rect.top()) % gridSize);
    QVarLengthArray<QLineF,100> lines;
    for (qreal x = left; x < rect.right(); x += gridSize) {
        lines.append(QLineF(x,rect.top(),x,rect.bottom()));
    }

    for (qreal y = top; y < rect.bottom(); y += gridSize) {
        lines.append(QLineF(rect.left(),y,rect.right(),y));
    }
    painter->drawLines(lines.data(),lines.size());
}

void View::drawForeground(QPainter *painter, const QRectF &rect)
{
    QPen p;
    p.setColor(Qt::black);
    p.setWidth(1);
    painter->setPen(p);
    painter->drawLine(-10000,0,10000,0);
    painter->drawLine(0,-10000,0,10000);
    p.setWidth(3);
    painter->setPen(p);
    painter->drawPoint(0,0);
    painter->drawText(2,-2,"0");
    painter->drawText(1, 15, "↓");
    painter->drawText(6, 8, "→");
}
