# ⏱️ Cronómetro & Temporizador

Aplicación web que combina un **cronómetro** y un **temporizador** en una sola interfaz, construida con HTML, CSS y JavaScript puro (sin frameworks ni dependencias de build).

🔗 **Demo en vivo:** [antmendez.github.io/Cronometro](https://antmendez.github.io/Cronometro/)

## ✨ Características

- **Cronómetro**: mide tiempo transcurrido con precisión de centésimas de segundo (`HH:MM:SS.CC`), con controles de Start / Stop / Reset.
- **Temporizador**: permite configurar horas, minutos y segundos mediante inputs, y hace la cuenta regresiva con sus propios controles de Start / Stop / Reset.
- **Modo oscuro / claro**: toggle de tema con ícono dinámico (sol/luna), y la preferencia se guarda en `localStorage` para persistir entre visitas.
- **Diseño responsive** basado en CSS Grid, con layout adaptable según el ancho de pantalla.
- **Íconos** de [Tabler Icons](https://tabler.io/icons) vía webfont.
- Sin dependencias externas de JavaScript: toda la lógica está escrita en vanilla JS.

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 (Grid, Flexbox, variables CSS, `clamp()`)
- JavaScript (DOM, `setInterval`, `localStorage`)

## 🚀 Uso

Al ser un proyecto sin build step, alcanza con abrir `index.html` en el navegador, o clonar el repo y usar una extensión tipo *Live Server*:

```bash
git clone https://github.com/AntMendez/Cronometro.git
cd Cronometro
git checkout remake
```

Luego abrí `index.html` en tu navegador.

## 📋 TO DO

- [x] Conectar lógica a la vista
- [x] BUG importante: al iniciar el temporizador y presionar "Start" varias veces antes de que finalice, entra en un bucle de `alert`
- [x] Temporizador: el input y el display no aparecen a la vez
- [x] Cronómetro y temporizador muestran botones específicos
- [ ] Vista responsive con ancho muy reducido: el botón Start del temporizador aparece debajo del footer
- [ ] Guardar en el navegador el estado de qué sección (cronómetro/temporizador) estaba activa, igual que el modo oscuro
- [ ] Colores de los botones en modo oscuro
- [ ] Inputs del temporizador con botones personalizados de incremento/decremento

## 📄 Licencia

Este proyecto es de uso libre. Si lo reutilizás o te sirvió de referencia, ¡una mención es siempre bienvenida! 🙌