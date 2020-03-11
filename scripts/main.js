var compound_transform;

// automatically called whenever any transform changes
function CalculateCompoundTransform(transforms) {
    // matrices in `transforms[i].mat4x4`
    // note `transform[0]` is first tranform to apply to vertex
    
    // if only one transform, set compound transform equal to it
    // otherwise multiply all matrices together (in proper order)
    // `compound_transform = Matrix.multiply(...)`
    var transform_matrices = [];
	var i;
	if(transforms.length < 2)
	{
		compound_transform = transforms[0].mat4x4
	}
	else
	{
		for(i = transforms.length-1; i >= 0; i--)
		{
			transform_matrices.push(transforms[i].mat4x4);
		}
		compound_transform = Matrix.multiply(transform_matrices);
	}
    return compound_transform;
}

// automatically called whenever compound transform changes
function CalculateTransformedVertex(vertex) {
    // multiple vertex by compound_transform
    // `final_vertex = Matrix.multiply(...)`
	
    var final_vertex = Matrix.multiply([compound_transform, vertex]); 

    return final_vertex;
}

// automatically called whenever user modifies a transform (changes type or values)
function ChangeTransform(index, type, values) {
    app.transforms[index].type = type;
    // update `app.transforms[index].mat4x4`
	var temp = new Matrix(4, 4);
	switch(type)
	{
		case "translate":
		{
			Mat4x4Translate(temp, values[0], values[1], values[2]);
			app.transforms[index].mat4x4 = temp;
			break;
		}
		case "scale":
		{
			Mat4x4Scale(temp, values[0], values[1], values[2]);
			app.transforms[index].mat4x4 = temp;
			break;
		}
		case "rotate_x":
		{
			Mat4x4RotateX(temp, values[0])
			app.transforms[index].mat4x4 = temp;
			break;
		}
		case "rotate_y":
		{
			Mat4x4RotateY(temp, values[0])
			app.transforms[index].mat4x4 = temp;
			break;
		}
		case "rotate_z":
		{
			Mat4x4RotateZ(temp, values[0])
			app.transforms[index].mat4x4 = temp;
			break;
		}
		default:
		{
			Mat4x4Identity(temp)
			app.transforms[index].mat4x4 = temp;
		}
	}
    // recalculate compound transform and tranformed vertex
    app.compound = CalculateCompoundTransform(app.transforms);
    app.final_vertex = CalculateTransformedVertex(app.vertex);
}
