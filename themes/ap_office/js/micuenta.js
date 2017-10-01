/*Author: J.Damián*/

//Function: Envía datos de logeo al cotizador
$(document).ready(function(){
	$("#btnToYii").click(function(e){
		e.preventDefault();
		if( $( this ).data('nombreusuario')!= '' && $( this ).data('id')!= '' )
		{
			var nombreUsuario= $( this ).data('nombreusuario');
			var idUsuario= $( this ).data('id');
			$.ajax({
				type: 'POST',
		    	data: {
		            usuario: nombreUsuario,
		            clave: '2016_'+idUsuario,
		        },
			    url: window.location.origin+'/cotizador/index.php?r=site/login',
			    cache: false,
			    complete: function (data) {
					window.open(window.location.origin+"/cotizador/index.php?r=Joyeria/cotizaciones/superIndex"); 
			    },
			    error: function (xhr, ajaxOptions, thrownError) {
			    	alert('Error al conectar con Cotizador, intente más tarde');
			    }
			});
		}

		else
	    	alert('Credenciales incorrectas para conectar con Cotizador, verifique con personal Nsstore');
	});
});