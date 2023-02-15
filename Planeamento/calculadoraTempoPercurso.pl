:-consult(dadosArmazens).
:-consult(dadosCamioes).
:-consult(dadosEntregas).

%--------------------------------------%
%   Calcular o tempo de cada percurso  %
%--------------------------------------%

calcular_custo(LE,LA,Custo):-                   % Predicado principal que chama todos os outros predicados necessários
    obter_peso(LE,LA,LP),                       % Obtêm a lista de pesos sem tara
    carateristicasCam(_,Tara,_,CargaTotal,_,_),
    acresenta_tara(Tara,LP,LPT),                % Acrescenta a Tara à lista de pesos
    custo_tempo(LE,LA,LPT,CargaTotal,Custo).    % Calcula o pesso do caminho

%---------------------------------------------%
%  Obtem o peso da entrega para cada armazém  %
%---------------------------------------------%

obter_peso(LE,LA,LP):-
    length(LE,TamanhoEntregas),                 % Obtêm o tamanho da lista de entregas
    length(LA,TamanhoPercurso),                 % Obtêm o tamanho do percurso
    Result is TamanhoEntregas - TamanhoPercurso,
    Result == -2 -> soma_peso(LE,LA,LP,_);      % Verifica se a diferença é de 2 por causa do armazém inicial e final que não contam
    write('A lista de entregas tem de ser do mesmo tamanho do percurso!'),
    false.

%---------------------------------------------%
% Calcula o peso da entrega para cada armazém %
%---------------------------------------------%
             
soma_peso(_,[],[],0):-!.
soma_peso(LE,[ArmazemAtual|LA],LP,PesoAc):-    % Verifca se o armazém atual é Matosinhos e se for avança
    idArmazem('Matosinhos', IdArmazem),
    ArmazemAtual == IdArmazem,
    !,
    soma_peso(LE,LA,LP,PesoAc).
soma_peso(LE,[ArmazemAtual|LA],[PesoAc|LM],PesoAc):-
    soma_peso(LE,LA,LM,PesoAc1),
    encontra_peso(LE,ArmazemAtual,Peso),      % Encontra o peso da entrega associado a esse armazém
    PesoAc is Peso + PesoAc1.

%--------------------------------------------------------%
% Verifica se o armazém está dentro da lista de entregas %
%--------------------------------------------------------%

encontra_peso([],Armazem,_):- !,
    write('O armazem '),write(Armazem),write(' deve estar na lista de entregas!'),  % Se chegar ao fim é porque o armazém não está na lista de entregas e acaba 
    false.
encontra_peso([EntregaAtual|LE],Armazem,Peso):-
    entrega(EntregaAtual,_,Peso,Armazem,_,_) -> true;                               % Se encontrar retorna o peso se não vai para o próximo elemento da lista
    encontra_peso(LE,Armazem,Peso).

%--------------------------------------------------------%
%     Acresenta a tara do camião ao peso das entregas    %
%--------------------------------------------------------%

acresenta_tara(Tara,[],[Tara]):-!.
acresenta_tara(Tara,[Peso|LP],[PesoTara|LPT]):-
    acresenta_tara(Tara,LP,LPT),
    PesoTara is Peso + Tara.


%--------------------------------------------------------%
%               Calcular o custo do percurso             %
%--------------------------------------------------------%

custo_tempo(_,[_],[],_,0):-!.
custo_tempo(LE,[A1,A2|LA],[PT|LPT],EnergiaAtual,TempoAc):-
    dadosCam_t_e_ta(_,A1,A2,Tempo,Energia,TempoAdicional),                                                              % Obtêm dados da viagem do Armazém 1 (A1) para o Armazém 2 (A2)
    carateristicasCam(_,Tara,Capacidade,_,_,_),                                                                         % Obtêm a tara e a capacidade do camião
    encontra_tempo_retirada(LE,A1,TempoRet),                                                                            % Obtêm o tempo que demora a retirar a entrega no camião
    EnergiaNecessaria is Energia * PT / (Tara + Capacidade),                                                            % Obtêm a energia necessária para a próxima viagem
    verificar_carregamento(EnergiaAtual,EnergiaNecessaria,EnergiaChegadaSemParagem,TempoRet,TempoExtraCarregamento),    % Verifica se vai ser necessário carregar o camião
    verificar_paragem(EnergiaChegada,EnergiaChegadaSemParagem,TempoAdicional,TempoExtraParagem),                        % Verifica se vai ser necessário fazer paragem
    custo_tempo(LE,[A2|LA],LPT,EnergiaChegada,TempoAc1),                                                            
    TempoAc is TempoExtraCarregamento + TempoExtraParagem + TempoAc1 + Tempo * PT / (Tara + Capacidade).
    
%--------------------------------------------------------%
%               Verifica se há carregamento              %
%--------------------------------------------------------%

verificar_carregamento(EnergiaAtual,EnergiaNecessaria,EnergiaChegadaSemParagem,_,TempoExtraCarregamento):-  % Se a energia não chegar terá de carregar até 80%
    EnergiaAtual - EnergiaNecessaria < 0,                                                          
    !,
    carateristicasCam(_,_,_,CargaTotal,_,TempoRecarga20a80),
    TempoExtraCarregamento is (CargaTotal * 0.8 - EnergiaAtual) * 60 / (TempoRecarga20a80 * 0.80),
    EnergiaChegadaSemParagem is (CargaTotal * 0.8 - EnergiaNecessaria).

verificar_carregamento(EnergiaAtual,EnergiaNecessaria,EnergiaChegadaSemParagem,TempoRet,TempoRet):-        % Se a energia chegar apenas subtrai a energia necessária à energia atual
    EnergiaChegadaSemParagem is EnergiaAtual - EnergiaNecessaria.


%--------------------------------------------------------%
%                  Verifica se há paragem                %
%--------------------------------------------------------%

verificar_paragem(EnergiaChegada,EnergiaChegadaSemParagem,TempoAdicional,TempoAdicional):-          % Se a energia de chegada for inferior a 20% vai ter de fazer uma paragem
    carateristicasCam(_,_,_,CargaTotal,_,_),
    EnergiaChegadaSemParagem < (CargaTotal * 0.20),
    !,
    EnergiaChegada is CargaTotal * 0.20.

verificar_paragem(EnergiaChegadaSemParagem,EnergiaChegadaSemParagem,_,0).                           % Se não for o tempo extra de paragem vai ser 0
    
%--------------------------------------------------------%
%         Calcula o tempo de retirada da entrega         %
%--------------------------------------------------------%

encontra_tempo_retirada([],_,0).
encontra_tempo_retirada([EntregaAtual|LE],Armazem,TempoRet):-
    entrega(EntregaAtual,_,_,Armazem,_,TempoRet) -> true;
    encontra_tempo_retirada(LE,Armazem,TempoRet).
