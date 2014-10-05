$(document).ready(function() {
	$(document).bind('deviceready', function() {
		navigator.splashscreen.hide();
	});

	$('#autenticarBtn').click(function(event) {
		event.preventDefault();
		exibirCarregando('Autenticando...');

		var dadosUsuario = {
			usuario : $('#usuario').val(),
			senha : $('#senha').val()
		}

		if(!(validarCampo(dadosUsuario.usuario) && validarCampo(dadosUsuario.senha))) {
			tratamentoErroMensagem('Preencha o usuário e a senha.');

			return;
		}

		executarServicoPost('pistas_login/autenticar_usuario', dadosUsuario, function(data) {
			if(data.codigo != undefined) {
	    		tratamentoErroMensagem(data.mensagem);

	    		return;
	    	}

			esconderCarregando();
	    	
	    	if(data.autenticado == true) {
	    		carregarTelaInicial();

	    		location.hash = 'paginaInicial';
	    	} else {
	    		tratamentoErroMensagem('Usuário e senha não encontrados.');
	    	}
		});
	});
});

function carregarTelaInicial() {
	executarServicoGet('pistas_evento/proximos_eventos', {}, function(data) {
		if(data.codigo != undefined) {
    		tratamentoErroMensagem(data.mensagem);

    		return;
    	}

		if(data.length > 0) {
			cabecalhoEvento = null;
			evento = '';
			dataEvento = null;
			quantidadeEventosData = 0;

			$.each(data, function(i, val) {
				if(dataEvento != null) {
					if(dataEvento != val.dataEvento) {
						cabecalhoEvento = cabecalhoEvento.append('<span class="ui-li-count">').append(quantidadeEventosData).append('</span></li>');

						$('#listaEventos').append(cabecalhoEvento);
						$('#listaEventos').append(evento);
						
						quantidadeEventosData = 0;
						cabecalhoEvento = '<li data-role="list-divider">'.append(val.dataFormatada);
					}
					
					evento = evento.concat(montarEstruturaEvento(val));
				} else {
					cabecalhoEvento = '<li data-role="list-divider">';
					cabecalhoEvento = cabecalhoEvento.concat(val.dataFormatada);
					
					evento = evento.concat(montarEstruturaEvento(val));
				}

				quantidadeEventosData++;
				dataEvento = val.dataEvento;
			});

			cabecalhoEvento = cabecalhoEvento.concat('<span class="ui-li-count">').concat(quantidadeEventosData).concat('</span></li>');

			$('#listaEventos').append(cabecalhoEvento);
			$('#listaEventos').append(evento);

			cabecalhoEvento = '';
			evento ='';

			$('#listaEventos').listview('refresh');
		} else {
			$('#eventos').html('<label>Não foi encontrado nenhum evento.</label>');
		}

		esconderCarregando();
	});
}

function montarEstruturaEvento(val) {
	var estruturaEvento = '<li><a href="#encontrarEvento"> <h2>';
	estruturaEvento = estruturaEvento.concat(val.local).concat('</h2>');
	estruturaEvento = estruturaEvento.concat('<p><strong>').concat(val.nome).concat('</strong></p>');
	estruturaEvento = estruturaEvento.concat('<p>').concat(val.descricao).concat('</p></a></li>');
	
	return estruturaEvento;
}
