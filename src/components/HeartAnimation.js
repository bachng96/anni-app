import React, { useEffect } from "react";
import "../styles/HeartAnimation.css";

const HeartAnimation = () => {

  useEffect(() => {
    const initAnimation = () => {
      var canvas = document.getElementById("heart");
      var ctx = canvas.getContext("2d");
      var width = (canvas.width = window.innerWidth);
      var height = (canvas.height = window.innerHeight);
      var rand = Math.random;

      const heartPosition = (rad) => {
        return [
          Math.pow(Math.sin(rad), 3),
          -(
            15 * Math.cos(rad) -
            5 * Math.cos(2 * rad) -
            2 * Math.cos(3 * rad) -
            Math.cos(4 * rad)
          ),
        ];
      };

      const scaleAndTranslate = (pos, sx, sy, dx, dy) => {
        return [dx + pos[0] * sx, dy + pos[1] * sy];
      };

      var traceCount = 50;
      var pointsOrigin = [];
      var dr = 0.1;

      for (let i = 0; i < Math.PI * 2; i += dr)
        pointsOrigin.push(scaleAndTranslate(heartPosition(i), 210, 13, 0, 0));
      for (let i = 0; i < Math.PI * 2; i += dr)
        pointsOrigin.push(scaleAndTranslate(heartPosition(i), 150, 9, 0, 0));
      for (let i = 0; i < Math.PI * 2; i += dr)
        pointsOrigin.push(scaleAndTranslate(heartPosition(i), 90, 5, 0, 0));

      var heartPointsCount = pointsOrigin.length;
      var targetPoints = [];

      const pulse = (kx, ky) => {
        for (let i = 0; i < pointsOrigin.length; i++) {
          targetPoints[i] = [];
          targetPoints[i][0] = kx * pointsOrigin[i][0] + width / 2;
          targetPoints[i][1] = ky * pointsOrigin[i][1] + height / 2;
        }
      };

      var e = [];
      for (let i = 0; i < heartPointsCount; i++) {
        var x = rand() * width;
        var y = rand() * height;
        e[i] = {
          vx: 0,
          vy: 0,
          R: 2,
          speed: rand() + 5,
          q: ~~(rand() * heartPointsCount),
          D: 2 * (i % 2) - 1,
          force: 0.2 * rand() + 0.7,
          f:
            "hsla(0," +
            ~~(40 * rand() + 60) +
            "%," +
            ~~(60 * rand() + 20) +
            "%,.3)",
          trace: [],
        };
        for (let k = 0; k < traceCount; k++) e[i].trace[k] = { x, y };
      }

      const config = {
        traceK: 0.4,
        timeDelta: 0.01,
      };

      var time = 0;

      const loop = () => {
        var n = -Math.cos(time);
        pulse((1 + n) * 0.5, (1 + n) * 0.5);
        time += (Math.sin(time) < 0 ? 9 : n > 0.8 ? 0.2 : 1) * config.timeDelta;
        ctx.fillStyle = "rgba(0,0,0,.1)";
        ctx.fillRect(0, 0, width, height);

        for (let i = e.length; i--; ) {
          var u = e[i];
          var q = targetPoints[u.q];
          var dx = u.trace[0].x - q[0];
          var dy = u.trace[0].y - q[1];
          var length = Math.sqrt(dx * dx + dy * dy);
          if (10 > length) {
            if (0.95 < rand()) u.q = ~~(rand() * heartPointsCount);
            else {
              if (0.99 < rand()) u.D *= -1;
              u.q += u.D;
              u.q %= heartPointsCount;
              if (0 > u.q) u.q += heartPointsCount;
            }
          }
          u.vx += (-dx / length) * u.speed;
          u.vy += (-dy / length) * u.speed;
          u.trace[0].x += u.vx;
          u.trace[0].y += u.vy;
          u.vx *= u.force;
          u.vy *= u.force;
          for (let k = 0; k < u.trace.length - 1; ) {
            var T = u.trace[k];
            var N = u.trace[++k];
            N.x -= config.traceK * (N.x - T.x);
            N.y -= config.traceK * (N.y - T.y);
          }
          ctx.fillStyle = u.f;
          for (let k = 0; k < u.trace.length; k++) {
            ctx.fillRect(u.trace[k].x, u.trace[k].y, 1, 1);
          }
        }

        window.requestAnimationFrame(loop);
      };

      window.requestAnimationFrame(loop);
    };

    initAnimation();
  }, []);

  return <canvas id="heart" className="heart-container"></canvas>;
};

export default HeartAnimation;
