const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d') // Get the 2D drawing context of the canvas element

// From this point, you can use the context 'c' to draw on the <canvas> using the methods and properties provided by the 2D context. For example, you can draw shapes, fill a color, draw text, etc.
 
canvas.width=1024 //resize background window
canvas.height= 576 //resize background window
c.fillRect(0, 0, canvas.width, canvas.height); //  Draw a filled rectangle that covers the entire canvas (x,y width of drawing, height of drawing). Background is white , cnavas is black.
//fillRect() is a method provided by the CanvasRenderingContext2D API



