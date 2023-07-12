const filesystem = require('./node_modules/graceful-fs/graceful-fs')
const inquirer = require("inquirer");
const {Circle, Square, Triangle} = require("./lib/shapes");


class SvgLogo{
    constructor(){
        this.textElement = '';
        this.shapeElement = '';
    }
    render(){

        return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="300" height="200">${this.shapeElement}${this.textElement}</svg>`
    }
    setTextElement(text,color){
        this.textElement = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${text}</text>`
    }
    setShapeElement(shape){
        this.shapeElement = shape.render()

    }
    
}


const questions = [
    {
        type: "input",
        name: "text",
        message: "TEXT: Enter up to 3 Characters:",
    },
    {
        type: "input",
        name: "text-color",
        message: "Enter the TEXT color keyword (OR a Hex color code like #ff4800):",
    },
    {
        type: "input",
		name: "shape",
        message: "Enter the SHAPE color keyword (OR a Hex color code like #b8e6f2):",
    },
    {
        type: "list",
        name: "pixel-image",
        message: "Choose the Symbol pixel-image you would like?",
        choices: ["Circle", "Square", "Triangle"],
    },
];


function writeToFile(fileName, data) {
	console.log("Writing [" + data + "] to file [" + fileName + "]")
    filesystem.writeFile(fileName, data, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("It has generated a logo.svg!");
    });
}

async function init() {
	let svgStringXML = "";
	let svg_LogoFile = "logo.svg";
    const answers = await inquirer.prompt(questions);
// inquirer.prompt(questions)
// .then((answers)=>{
	
// })

	//user text
	let user_text = "";
	if (answers.text.length > 0 && answers.text.length < 4) {
		// 1-3 chars, valid entry
		user_text = answers.text;
	} else {
		// 0 or 4+ chars, invalid entry
		console.log("Error, Please enter 1 to 3 Characters");
        return;
	}

	console.log("User text: [" + user_text + "]");
	//user font color
	user_font_color = answers["text-color"];
	console.log("User font color: [" + user_font_color + "]");
	//user shape color
	user_shape_color = answers.shape;
	console.log("User shape color: [" + user_shape_color + "]");
	//user shape type
	user_shape_type = answers["pixel-image"];
	console.log("User entered shape = [" + user_shape_type + "]");
	
	
	let user_shape;
	
	if (user_shape_type === "Square" ) {
	 	user_shape = new Square();
	 	console.log("User selected Square shape");
	 }
	 else if (user_shape_type === "Circle" ) {
	 	user_shape = new Circle();
	 	console.log("User selected Circle shape");
	 }
	 else if (user_shape_type === "Triangle" ) {
	 	user_shape = new Triangle();
	 	console.log("User selected Triangle shape");
	 }
	 else {
	 	console.log("Invalid Symbol pixel-image!");
	 }

	user_shape.setColor(user_shape_color);
	
	let svg = new SvgLogo();
		//console.log("svg:",svg);
	svg.setTextElement(user_text, user_font_color);
	svg.setShapeElement(user_shape);
	svgStringXML = svg.render();
	
	console.log("Displaying shape:\n" + svgStringXML);
	console.log("Generation of the shape is complete!");
	console.log("Writing the shape to file...");
	writeToFile(svg_LogoFile, svgStringXML); 
}
init()