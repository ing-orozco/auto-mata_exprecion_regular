$.getJSON('json/lang.json',function(json){
    $('#lenguage').click(function(){
        let leng = $(this).val();
        $('.lang').each(function(index,value){
            if($(this).attr('key') == 'palabra'){
                $(this).attr("placeholder", json[leng][$(this).attr('key')]);
            }else{
                $(this).text(json[leng][$(this).attr('key')]);
            }
        })
    });
});

var elInput3 = document.querySelector('#input3');
if (elInput3) {
  var w = parseInt(window.getComputedStyle(elInput3, null).getPropertyValue('width'));
  var etq = document.querySelector('.etiqueta');
  var valor= elInput3.value;
  valor=valor/1000 + ' S'
  if (etq) {
    etq.innerHTML = valor;

    var pxls = w / 100;

    etq.style.left = ((elInput3.value * pxls) - 15) + 'px';

    elInput3.addEventListener('input', function() {
      valor= elInput3.value;
      valor= valor / 1000 + ' S'
      etq.innerHTML = valor; 
      etq.style.left = ((elInput3.value * pxls) - 15) + 'px';

    }, false);
  }
}

var vecnode=[];
var vecedges=[];
var nodes = new vis.DataSet([
    { id: 1, label: "q1", title:'entrada' },
    { id: 2, label: "q2" , title:'st aceptacion'},
    { id: 3, label: "q3" , title:'st aceptacion'},
    { id: 4, label: "q4" },
    { id: 13,color:'white' }
]);

var edges = new vis.DataSet([
    {id:5, from: 1, to: 2, arrows: "to", label:'a' },
    {id:6, from: 1, to: 3, arrows: "to", label:'b.c'},
    {id:7, from: 2, to: 4, arrows: "to" , label:'b.c'},
    {id:8, from: 2, to: 2, arrows: "to", label:'a' },
    {id:9, from: 3, to: 4, arrows: "to" , label:'a'},
    {id:10, from: 3, to: 3, arrows: "to" , label:'b.c'},
    {id:11, from: 4, to: 4, arrows: "to", label:'a.b.c'},
    {id:12, from: 13 , to: 1, arrows: "to"}
]);

// create a network
var container = document.getElementById("mynetwork");
var data = {
    nodes: nodes,
    edges: edges,
};

var options = {
    width: '100%',
    height: '400px',
    nodes:{
        color:{
            background: 'white',
            border: 'red',
            highlight: {
              background: 'pink',
              border: 'red'
            }
        }
    },
    edges:{
        color:'gray'
    }
};

var network = new vis.Network(container, data, options);

function limpiar(){
    let i;
    for(i=0;i<vecnode.length;i++){
        if(vecnode[i]==1)
        data.nodes.update({id:1, label:'q1'});
        
        if(vecnode[i]==2)
        data.nodes.update({id:2, label:'q2'});
        
        if(vecnode[i]==3)
        data.nodes.update({id:3, label:'q3'});

        data.nodes.update({id: vecnode[i],
            color:{
                background: 'white',
                border: 'red',
                highlight: {
                background: 'pink',
                border: 'red'
                }
            }
        })
    }
    for(i=0;i<vecedges.length;i++){
        data.edges.update({id:vecedges[i], color:'gray'})
    }
}

function reducirexprecion(palabra){
    let aux,aux2,pal;
    let cont,cont2;
    pal=palabra;
    for (let index = 0; index < pal.length; index++) {
        if(pal.charAt(index)==pal.charAt(index+1)){
                for (let index2 = index+2; index2 < pal.length; index2++){
                    if(pal.charAt(index)==pal.charAt(index2)){
                        cont2=index2;
                    }else{
                        cont2=pal.length;
                        break;
                    }              
                }
            cont=index+1;
            aux=pal.slice(0,cont);
            cont=index+3;
            aux2=pal.slice(cont2,pal.length);
            pal=aux+aux2;

        }
    }
    return pal;
}


function afd(pal,estado,aux){
    const pal2 = document.getElementById("palabra").value;
    const vel = document.getElementById("input3").value;
    if(aux==0){
        console.log(pal2);
        pal=reducirexprecion(pal2);
        console.log(pal);
    }
if(pal.charAt(aux) != ''){
    if(pal.charAt(aux) == 'a'){
        if(estado =='q1' || estado =='q2'){
            return setTimeout(function(){ 
                if(estado =='q1'){
                    data.nodes.update({id: 1, label: 'inicio',color:'red'});
                    vecnode.push(1)
                    data.edges.update({id: 5,color:'red'});
                    vecedges.push(5)
                    data.nodes.update({id: 2,color:'red'});
                    vecnode.push(2);
                }else{
                    data.edges.update({id: 8,color:'red'});
                    vecedges.push(8);
                }
                aux=aux+1;
                afd(pal,'q2',aux); 
            }, vel);
        }else{
            return setTimeout(function(){
                if(estado =='q3'){
                    data.edges.update({id: 9,color:'red'});
                    vecedges.push(9);
                    data.nodes.update({id: 4,color:'red'});
                    vecnode.push(4);
                }else{
                    data.edges.update({id: 11,color:'red'});
                    vecedges.push(11);
                }
                aux=aux+1; 
                afd(pal,'q4',aux); 
            }, vel); 
        }
    }else if(pal.charAt(aux) == 'b' || pal.charAt(aux) == 'c'){
        if(estado =='q1' || estado=='q3'){
            return setTimeout(function(){ 
                if(estado =='q1'){
                    data.nodes.update({id: 1, label: 'inicio',color:'red'});
                    vecnode.push(1)
                    data.edges.update({id: 6,color:'red'});
                    vecedges.push(6);
                    data.nodes.update({id: 3,color:'red'});
                    vecnode.push(3);
                }else{
                    data.edges.update({id: 10,color:'red'});
                    vecedges.push(10);
                }
                aux=aux+1;
                afd(pal,'q3',aux);
            }, vel);
        }else{
            return setTimeout(function(){ 
                if(estado =='q2'){
                    data.nodes.update({id: 4,color:'red'});
                    vecnode.push(4)
                    data.edges.update({id: 7,color:'red'});
                    vecedges.push(7);
                }else{
                    data.edges.update({id: 11,color:'red'});
                    vecedges.push(11);
                }
                aux=aux+1;
                afd(pal,'q4',aux);
            }, vel);
        }
    }else if(pal.charAt(0) == '°') {
        data.nodes.update({id: 1,color:'green',label: 'succes'}).try(console.error("no leyo"));
        vecnode.push(1);
        return;
    }
}else{
    if(estado == 'q2' || estado == 'q3'){
        if(estado == 'q2'){
            data.nodes.update({id: 2,color:'green',label: 'succes'});
            vecnode.push(2);
        }else{
            data.nodes.update({id: 3,color:'green',label: 'succes'});
            vecnode.push(3);
        }
        return;
    }
}
return;
}