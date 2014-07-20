/*graph.js file*/
function Graph(canvas) {						/*parent */
	this.context = canvas.getContext('2d');
	this.x_coeff=0;
	this.y_coeff=0;
	this.constant=0;
}

Graph.prototype.getOrigin= function(){					/*get method of parent*/
	this.context.translate(10, canvas.height-10);		/*Translate origin to lower left corner*/
	this.context.scale(1,-1);					/*set the scale to match translated origin*/
}

Graph.prototype.drawAxes=function(steps){				/*draw axes of graph. It extends graph */
	this.context.beginPath();					/*draw x-Axis */
	this.context.moveTo(0,0);
	this.context.lineTo(canvas.width,0);
	this.context.strokeStyle="green";
	this.context.stroke();

	for(i=0;i<=canvas.width;i+=steps){			/*Make markings on the graph at interval 0f 10*/
		this.context.moveTo(i,0);
		this.context.lineTo(i,10);
		this.context.strokeStyle="green";
		this.context.stroke();
	}


	this.context.moveTo(0,0);					/*draw y-Axis*/
	this.context.lineTo(0,canvas.height);
	this.context.strokeStyle="green";
	this.context.stroke();

	for(i=0;i<=canvas.height;i+=steps){
		this.context.moveTo(0,i);
		this.context.lineTo(10,i);
   		this.context.strokeStyle="green";
  		this.context.stroke();
	}
}

Graph.prototype.parseEquation = function(equation){			/* This function will parse the given equation and find the points */
	var i=0;
	this.len=equation.length;
	if(equation[0]=="x"){						/*parse till you get x and get it's coefficient*/
		this.x_coeff= 1;
	}
	else{
		while(equation[i]!="x"){
			this.x_coeff=this.x_coeff + equation[i];
			i++;
		}
		this.x_coeff[i]='\0';
	}
	i++;
	if(equation[i]=="+" || equation[i]=="-"){				/*If + or - sign move ahead*/
		i++;
		if(equation[i]=="y"){					/*parse till you get y and get it's coefficient*/
			this.y_coeff=1;
		}
		else{
			while(equation[i]!="y"){
				this.y_coeff=this.y_coeff+equation[i];		
				i++;	
			}
			this.y_coeff[i]='\0';
		}
	}
	i++;
	if(equation[i]=="="){						/*parse till end of string to get constant*/	
		i++;
		while(equation[i]<=this.len){
			this.constant=this.constant+equation[i];	
			i++;	
		}
	}
	this.constant[i]='\0';
}

Graph.prototype.drawLine= function(start,end,steps){
	var i=0,j=0;
	var x=[],y=[];
	for(j=0,i=start;i<=end && j<=end;i+=steps,j++){		/*Calculate points  based on user input*/
		x[j]=i;
		y[j]=(this.constant - (i*this.x_coeff))/this.y_coeff;
	}
	
	for(i=0;i<j;i++){					/*Plot points*/
		this.context.rect(x[i],y[i],2,2);
		this.context.stroke();
	}
	this.context.beginPath();				/*Connect points by line*/
	this.context.moveTo(x[0],y[0]);
    	this.context.lineTo(x[j-1],y[j-1]);
  	this.context.strokeStyle="red";
  	this.context.stroke();
}

$('document').ready(function(){	
	
	var canvas = document.getElementById("canvas");
	var graphObject = new Graph(canvas);			/*make object of Graph*/
	graphObject.getOrigin();				
	
	$('#enter').click(function(){				/*on click of submit parse euation*/
		var equation=document.getElementById("equation").value;
		graphObject.parseEquation(equation);
	var start=Math.abs(document.getElementById("start").value -0);
	var steps=Math.abs(document.getElementById("steps").value-0);
	var end=Math.abs(document.getElementById("end").value-0);
	graphObject.drawAxes(steps);
	graphObject.drawLine(start,end,steps);
	});
});	



