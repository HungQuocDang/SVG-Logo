const {Circle, Square, Triangle} = require("./shapes")


   // Circle Shape
  describe('Circle', () => {
    test('renders correctly circle', () => {
        const shape = new Circle();
        let color =('blue')
        shape.setColor(color);
        expect(shape.render()).toEqual(`<circle cx="50%" cy="50%" r="100" height="100%" width="100%" fill="${color}"/>`);
    });
  });
  // Square Shape
  describe('Square', () => {
      test('renders correctly square', () => {
        const shape = new Square();
        let color =('yellow');
        shape.setColor(color);
        expect(shape.render()).toEqual(`<rect x="50" height="200" width="200" fill="${color}"/>`);
      });
    });
  // Triangle Shape
  describe('Triangle', () => {
      test('renders correctly triangle', () => {
        const shape = new Triangle();
        let color =('red');
        shape.setColor(color);
        expect(shape.render()).toEqual(`<polygon height="100%" width="100%" points="150, 18 244, 182 56, 182" fill="${color}"/>`);
        
      });
    });