:- use_module(library(http/http_json)).
:- use_module(library(http/http_open)).
:- use_module(library(http/json)).
:- use_module(library(http/json_convert)).
:- use_module(library(http/http_client)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/http_parameters)).
:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- consult(heuristica).
:- consult(geradorMelhorTrajetoria).
:- consult(bootstrapper).
:- consult(calculadoraTempoPercurso).

servidor(Port) :-
    http_server(http_dispatch,[port(Port)]).

:- http_handler('/rota/1', obter_caminho1, []).
        obter_caminho1(Request) :- http_parameters(Request,[camiao(Camiao, []),data(Data, [])]),
        upload_dados(Camiao, Data),
        cors_enable(Request,[methods([get])]),
        trajeto_cust_min(Data, P, Custo),
        prolog_to_json(P, JSONO),
        reply_json(JSONO, [json_object(dict)]).

:- http_handler('/rota/2', obter_caminho2, []).
obter_caminho2(Request) :- 
        http_parameters(Request,[camiao(Camiao, []),data(Data, [])]),
        upload_dados(Camiao, Data),
        cors_enable(Request,[methods([get])]),
        calc_heuristico_peso(Data, P, Custo),
        prolog_to_json(P, JSONO),
        reply_json(JSONO, [json_object(dict)]).

:- http_handler('/rota/3', obter_caminho3, []).
obter_caminho3(Request) :- 
        http_parameters(Request,[camiao(Camiao, []),data(Data, [])]),
        upload_dados(Camiao, Data),
        cors_enable(Request,[methods([get])]),
        calc_heuristico_tempo(Data, P, Custo),
        prolog_to_json(P, JSONO),
        reply_json(JSONO, [json_object(dict)]).

:- http_handler('/rota/4', obter_caminho4, []).
obter_caminho4(Request) :- 
        http_parameters(Request,[camiao(Camiao, []),data(Data, [])]),
        upload_dados(Camiao, Data),
        cors_enable(Request,[methods([get])]),
        calc_heuristico_peso_tempo(Data, P, Custo),
        prolog_to_json(P, JSONO),
        reply_json(JSONO, [json_object(dict)]).


:- servidor(7000).