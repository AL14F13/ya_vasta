// JavaScript Document
$(document).ready(function(e) {
document.addEventListener("deviceready",function(){
	var basedatos= window.sqlitePlugin.openDatabase({name: "coloresBD.db",createFromLocation:1});
	cargarnombrejugador();
	audio=window.plugins.LowLatencyAudio;
	audio.preloadFX('b1','audio/C.mp3',function(){},function(msg){alert("Error "+msg);});
	audio.preloadFX('b2','audio/D.mp3',function(){},function(msg){alert("Error "+msg);});
	audio.preloadFX('b3','audio/E.mp3',function(){},function(msg){alert("Error "+msg);});
	audio.preloadFX('b4','audio/F.mp3',function(){},function(msg){alert("Error "+msg);});
	$('#btnjugar').on('tap',function(){
		var pantalla=$.mobile.getScreenHeight();
		var encabezado=$('.ui-header').outerHeight();
		var pie=$('.ui-footer').outerHeight();
		var contenido=$('.ui-content').outerHeight();
		var alto=(pantalla - encabezado - pie)/2
		//alert('pantalla  '+ pantalla)
		//alert('encabezado  '+ encabezado)
		//alert('pie  '+ pie)
		//alert('contenido  '+ contenido)
		//alert('alto ' + alto)
		$('.cuadro').height(alto);
		
	});
	
	//$('.cuadro').on('vmousedown',function(){
			//$(this).addClass('pulsado');
		//});
		//$('.cuadro').on('vmouseup',function(){
			//$(this).removeClass('pulsado');
		//});
		//function quien(q)i
		//{
			//audio.play(q);
			//return q.substring(1);
		//}
		
		//$('.cuadro').on('vmousedown',function(){
		//	$('#pantalla').append(quien($(this).attr('id')));
			//$(this).addClass('pulsado');
			
		//});
		
		
		function cargarnombrejugador()
		{
		 basedatos.transaction(function(ejecutar){
		 var sql="SELECT NombreUsuario FROM Usuario";
		 ejecutar.executeSql(sql,undefined,function(ejecutar,resultado){
		 var datosJugador=resultado.rows.item(0);
		 $('#jugador').text(datosJugador.NombreUsuario); 
			 
		 });
		 });
		 
		 
		}
		
		$('btnconfigurar').on('tap',function(){
		 $('txtnombre').val($('#jugador').text());	
		});	
		
	   $('#btnguardar').on('tap',function(){
		   var nuevonombre=$('#txtnombre').val();
		   basedatos.transaction(function(consulta){
		   consulta.executeSql("UPDATE Usuario SET NombreUsuario=? WHERE ClaveUsuario='1';",[nuevonombre])   
			 
	   });	   
	   });		
	  cargarnombrejugador();   //así se manda a llamar a nuestras funciones
	  
	  
	  
	  function flash(boton)
	  {
		  boton.stop().animate({opacity:'0.5'},{
		 duracion:80,
		 complete:function(){
			 boton.stop().animate({opacity:'1'},200);
		 }
		 			
         }); 
	    
		 }
		 
		 $('.cuadro').on('tap',function(){
			 flash($(this));
			 audio.play($(this).attr('id'));
		});
	 
			  
	 
			
}); 
});

