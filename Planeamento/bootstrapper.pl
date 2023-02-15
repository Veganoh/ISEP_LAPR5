:-use_module(library(http/http_open)).
:-use_module(library(http/json)).

%Busca um ficheiro JSON de todos os armazens na base de dados
%idArmazem(<local>,<codigo>)
upload_armazens():-
    setup_call_cleanup(
        http_open('http://vs775.dei.isep.ipp.pt:5000/api/Armazens', In, [request_header('Accept'='application/json')]),
        json_read_dict(In, Data),
        close(In)
    ),
    guardar_armazem(Data).


%Guarda os dados do ficheiro JSON
guardar_armazem([]).
guardar_armazem([X|Data]):- asserta(idArmazem(X.get(designacao), X.get(identificador))), 
    guardar_armazem(Data).



%Busca um ficheiro JSON de todos as Entregas com a pedida data
%entrega(<idEntrega>,<data>,<massaEntrefa>,<armazemEntrega>,<tempoColoc>,<tempoRet>)
upload_entregas(TimeX):-
    re_replace("/"/g, "-", TimeX, Time),
    atomic_list_concat(['http://vs775.dei.isep.ipp.pt:5000/api/Entregas/byDate/',Time, '/', Time],R),
    write(R),
    setup_call_cleanup(
        http_open(R, In, [request_header('Accept'='application/json')]),
        json_read_dict(In, Data),
        close(In)
    ),
    guardar_entrega(Data, TimeX).


%Guarda os dados do ficheiro JSON
guardar_entrega([], _).
guardar_entrega([X|Data], Time):- 
    asserta(entrega(X.get(identificador), Time,  X.get(peso_entrega), X.get(id_armazem), X.get(tempo_colocacao), X.get(tempo_retirada))), 
    guardar_entrega(Data, Time).    



%Busca um ficheiro JSON do camiao na base de dados
%carateristicasCam(<nome_camiao>,<tara>,<capacidade_carga>,<carga_total_baterias>,<autonomia>,<t_recarr_bat_20a80>).
upload_camiao(Camiao):-
    atomics_to_string(['http://vs770.dei.isep.ipp.pt:3000/api/camiao/', Camiao],R),
    setup_call_cleanup(
        http_open(R, In, [request_header('Accept'='application/json')]),
        json_read_dict(In, Data),
        close(In)
    ),
    asserta(carateristicasCam(Data.get(id),Data.get(tara),Data.get(capacidadeCargaTotal),Data.get(camiaoBateria),Data.get(autonomiaCamiao),Data.get(carregamentoRapido))). 


%Busca um ficheiro JSON de todos as Entregas com a pedida data
%dadosCam_t_e_ta(<nome_camiao>,<cidade_origem>,<cidade_destino>,<tempo>,<energia>,<tempo_adicional>).
upload_percursos(Camiao):-
    setup_call_cleanup(
        http_open('http://vs770.dei.isep.ipp.pt:3000/api/percursos', In, [request_header('Accept'='application/json')]),
        json_read_dict(In, Data),
        close(In)
    ),
    guardar_percursos(Data, Camiao).


%Guarda os dados do ficheiro JSON
guardar_percursos([], _).
guardar_percursos([X|Data], Camiao):- 
    asserta(dadosCam_t_e_ta(Camiao, X.get(armazemOrigem),X.get(armazemDestino),X.get(tempoBase),X.get(energiaGasta),X.get(tempoExtra))), 
    guardar_percursos(Data, Camiao). 



upload_dados(Camiao, Time):-
    retractall(dadosCam_t_e_ta(_,_,_,_,_,_)),
    retractall(carateristicasCam(_,_,_,_,_,_)),
    retractall(entrega(_,_,_,_,_,_)),
    retractall(idArmazem(_,_)),
    upload_armazens(),
    upload_entregas(Time),
    upload_camiao(Camiao),
    upload_percursos(Camiao).