interface ControlElementInterface{
	name : string;
	id : string;
	value : string;
	setId(id : string);
	setValue(value : string);
	setName(name : string);
}

abstract class ControlElement implements ControlElementInterface{
	name : string;
	id : string;
	value : string;
	private c : string;
	constructor(value? : string, name? : string, id? : string){
		this.name = name;
		this.id = id;
		this.value = value;
	}
	
	setId(id: string){
		this.id = id;
	}
	
	setValue(value: string){
		this.value = value;
	}
	
	setName(name: string){
		this.name = name;
	}
	
	abstract render() : string;
	
}

class Button extends ControlElement{
	constructor(value? : string, name? : string, id? : string){
		super(value || '', id || '', name || '');
	}
	render():string {
		let properties : string = '';
		
		if(this.name!='')
			properties+='name = "'+this.name+'" ';
		if(this.value!='')
			properties+='value = "'+this.value+'" ';
		if(this.id!='')
			properties+='id = "'+this.id+'" ';
			
		return '<button '+ properties+'>'+this.value+'</button>';
	}

}
class Select extends ControlElement{
	private listOption: SelectOption[];
	constructor(value? : string, name? : string, id? : string){
		super(value || '', id || '', name || '');
		this.listOption = [];
	}
	render():string {
		let options : string = '';
		
		for (let i=0; i<this.listOption.length; i++)
			options+=this.listOption[i].render();
			
		let properties : string = '';
		if(this.name!='')
			properties+='name = "'+this.name+'" ';
		if(this.value!='')
			properties+='value = "'+this.value+'" ';
		if(this.id!='')
			properties+='id = "'+this.id+'" ';
			
		return '<select '+properties+'>'+options+'</select>';
	}
	addOption(option: SelectOption){
		this.listOption[this.listOption.length]=option;
	}
}

class SelectOption extends ControlElement{
	constructor(value? : string, name? : string, id? : string){
		super(value || '', id || '', name || '');
	}
	render():string {
		let properties : string = '';
		if(this.name!='')
			properties+='name = "'+this.name+'" ';
		if(this.value!='')
			properties+='value = "'+this.value+'" ';
		if(this.id!='')
			properties+='id = "'+this.id+'" ';
			
		return '<option '+properties+'>'+this.value+'</option>';
	}
}
class Container {
	private elements : ControlElement[];
	
	constructor(){
		this.elements = [];
	} 
	
	addElement(element : ControlElement){
		this.elements[this.elements.length] = element;
	} 

	/*removeElementById(id : String){
		for(let i = 0; i<this.elements.length; i++)
			if(this.elements[i].id == id)
				this.elements = this.elements.splice(i,1);
		
	}*/
	getElement(index: number) : ControlElement{
		return this.elements[index];
	}
	length():number{
		return this.elements.length;
	}
}
class Page{
	private container : Container;
	constructor(){
	}
	setContainer(containter : Container){
		this.container = containter;
	}
	render(): void {
		let textHtml : string = '';
		for(let i = 0; i<this.container.length(); i++){
			textHtml+=this.container.getElement(i).render();
		} 
		document.body.innerHTML = textHtml;
	}
}
let Button1 = new Button();
Button1.setValue("first Button");

let Button2 = new Button("Second","2","Second Button");

let Select1 = new Select("Button1","1");
let option = new SelectOption("Selection1","3");
Select1.addOption(option);

let contain = new Container();

contain.addElement(Button2);
contain.addElement(Select1);

let page = new Page();
page.setContainer(contain);
page.render()