#ifndef VIEW_H
#define VIEW_H

#include <QMainWindow>

#include <QGraphicsScene>

class View : public QGraphicsScene
{

    Q_OBJECT

public:
    explicit View(QObject *parent = 0, int scale = 20);
    void drawBackground(QPainter *painter, const QRectF &rect) override;
    void drawForeground(QPainter *painter, const QRectF &rect) override;

public:

    int m_grid_span = 10;
    int gridSize = 20;

    int scaleOne = 20;

};

#endif // VIEW_H
