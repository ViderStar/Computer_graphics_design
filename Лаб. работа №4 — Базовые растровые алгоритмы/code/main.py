import time
import matplotlib.pyplot as plt
from matplotlib.widgets import TextBox
import math


def brezen(x1, y1, x2, y2):
    dx = x2 - x1
    dy = y2 - y1

    sign_x = 1 if dx > 0 else -1 if dx < 0 else 0
    sign_y = 1 if dy > 0 else -1 if dy < 0 else 0

    px = []
    py = []

    if dx < 0:
        dx = -dx
    if dy < 0:
        dy = -dy

    if dx > dy:
        pdx, pdy = sign_x, 0
        es, el = dy, dx
    else:
        pdx, pdy = 0, sign_y
        es, el = dx, dy

    x, y = x1, y1

    error, t = el / 2, 0

    px.append(x)
    py.append(y)

    while t < el:
        error -= es
        if error < 0:
            error += el
            x += sign_x
            y += sign_y
        else:
            x += pdx
            y += pdy
        t += 1
        px.append(x)
        py.append(y)
    return px, py


def circle(x1, y1, x2, y2):
    px = []
    py = []
    r = math.sqrt(pow(x1 - x2, 2) + pow(y1 - y2, 2))
    disp_x = x1
    disp_y = y1
    x = 0
    y = r
    delta = (1 - 2 * r)
    error = 0
    while y >= 0:
        px.append(disp_x + x)
        py.append(disp_y + y)
        px.append(disp_x + x)
        py.append(disp_y - y)
        px.append(disp_x - x)
        py.append(disp_y + y)
        px.append(disp_x - x)
        py.append(disp_y - y)

        error = 2 * (delta + y) - 1
        if ((delta < 0) and (error <= 0)):
            x += 1
            delta = delta + (2 * x + 1)
            continue
        if ((delta > 0) and (error > 0)):
            y -= 1
            delta = delta - (1 + 2 * y)
            continue
        x += 1
        delta = delta + (2 * (x - y))
        y -= 1
    return px, py


def dda(x1, y1, x2, y2):
    x = []
    y = []
    dx = x2 - x1
    dy = y2 - y1
    steps = abs(dx) if abs(dx) > abs(dy) else abs(dy)
    if steps == 0:
        return [x1], [y1]
    Xinc = float(dx / steps)
    Yinc = float(dy / steps)
    for i in range(0, int(steps + 1)):
        x.append(round(x1))
        y.append(round(y1))
        x1 += Xinc
        y1 += Yinc
    return x, y


def step(x1, y1, x2, y2):
    x = []
    y = []
    dx = x2 - x1
    dy = y2 - y1
    xx = min(x1, x2)
    if dx == 0 and dy == 0:
        return [x1], [y1]
    if dy == 0:
        while xx <= max(x2, x1):
            y.append(y1)
            x.append(xx)
            xx += 1
        return x, y
    if dx == 0:
        yy = min(y1, y2)
        while yy <= max(y2, y1):
            y.append(yy)
            x.append(x1)
            yy += 1
        return x, y
    while xx <= max(x2, x1):
        y.append(round(y1 + dy * (xx - x1) / dx))
        x.append(xx)
        xx += 1
    return x, y


def submit(text):
    coor = list(map(int, text.split()))
    if (len(coor) == 4):
        ax1.clear()
        ax2.clear()
        ax3.clear()
        ax4.clear()

        start1 = time.perf_counter()
        point_x, point_y = brezen(coor[0], coor[1], coor[2], coor[3])
        ax1.plot(point_x, point_y, '-')
        ax1.plot(point_x, point_y, '.')
        end1 = time.perf_counter()

        start2 = time.perf_counter()
        x, y = circle(coor[0], coor[1], coor[2], coor[3])
        ax2.plot(x, y, '.')
        end2 = time.perf_counter()

        start3 = time.perf_counter()
        dx, dy = dda(coor[0], coor[1], coor[2], coor[3])
        ax3.plot(dx, dy, '-')
        ax3.plot(dx, dy, '.')
        end3 = time.perf_counter()

        start4 = time.perf_counter()
        sx, sy = step(coor[0], coor[1], coor[2], coor[3])
        ax4.plot(sx, sy, '-')
        ax4.plot(sx, sy, '.')
        end4 = time.perf_counter()
        grid(start1, start2, start3, start4, end1, end2, end3, end4)
        plt.draw()


def grid(start1, start2, start3, start4, end1, end2, end3, end4):
    ax1.grid()
    # ax1.minorticks_on()
    ax2.grid()
    # ax2.minorticks_on()
    ax3.grid()
    # ax3.minorticks_on()
    ax4.grid()
    # ax4.minorticks_on()

    ax1.grid(which='major',
             color='k',
             linewidth=0.1)
    ax1.grid(which='minor',
             color='k',
             linewidth=0.1)
    ax2.grid(which='major',
             color='k',
             linewidth=0.1)
    ax2.grid(which='minor',
             color='k',
             linewidth=0.1)
    ax3.grid(which='major',
             color='k',
             linewidth=0.1)
    ax3.grid(which='minor',
             color='k',
             linewidth=0.1)
    ax4.grid(which='major',
             color='k',
             linewidth=0.1)
    ax4.grid(which='minor',
             color='k',
             linewidth=0.1)

    ax1.set_ylabel("y", labelpad=1, loc='bottom')
    ax1.set_xlabel("x", labelpad=1, loc='left')
    ax2.set_ylabel("y", labelpad=1, loc='bottom')
    ax2.set_xlabel("x", labelpad=1, loc='left')
    ax3.set_ylabel("y", labelpad=1, loc='bottom')
    ax3.set_xlabel("x", labelpad=1, loc='left')
    ax4.set_ylabel("y", labelpad=1, loc='bottom')
    ax4.set_xlabel("x", labelpad=1, loc='left')

    ax1.set_title(f"Алгоритм Брезенхема "
                  f"(время выполнения: {float('{:.5f}'.format(end1 - start1))} сек)")
    ax2.set_title(f"Окружность Брезенхема "
                  f"(время выполнения: {float('{:.5f}'.format(end2 - start2))} сек)")
    ax3.set_title(f"Алгоритм ЦДА "
                  f"(время выполнения: {float('{:.5f}'.format(end3 - start3))} сек)")
    ax4.set_title(f"Пошаговый алгоритм "
                  f"(время выполнения: {float('{:.5f}'.format(end4 - start4))} сек)")


if __name__ == "__main__":
    fig = plt.figure()
    ax1 = fig.add_subplot(221)
    ax2 = fig.add_subplot(222)
    ax3 = fig.add_subplot(223)
    ax4 = fig.add_subplot(224)

    ax = fig.add_axes([0.1, 0, 0.8, 0.05])
    x = [10, 3]
    y = [1, 8]

    start1 = time.perf_counter()
    point_x, point_y = brezen(x[0], x[1], y[0], y[1])
    ax1.plot(point_x, point_y, '-')
    ax1.plot(point_x, point_y, '.')
    end1 = time.perf_counter()

    start2 = time.perf_counter()
    cx, cy = circle(x[0], x[1], y[0], y[1])
    ax2.plot(cx, cy, '.')
    end2 = time.perf_counter()

    start3 = time.perf_counter()
    dx, dy = dda(x[0], x[1], y[0], y[1])
    ax3.plot(dx, dy, '-')
    ax3.plot(dx, dy, '.')
    end3 = time.perf_counter()

    start4 = time.perf_counter()
    sx, sy = step(x[0], x[1], y[0], y[1])
    ax4.plot(sx, sy, '-')
    ax4.plot(sx, sy, '.')
    end4 = time.perf_counter()

    grid(start1, start2, start3, start4, end1, end2, end3, end4)
    text_box = TextBox(ax, "Поле ввода", initial="10 3 1 8")
    text_box.on_submit(submit)
    plt.show()
