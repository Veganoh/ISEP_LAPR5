%US Minorante e Majorante (1190558)

:-consult(dadosArmazens).
:-consult(dadosCamioes).
:-consult(dadosEntregas).
:-consult(calculadoraTempoPercurso).

:-dynamic minorante/2.
:-dynamic majorante/2.

% ------------------Predicados auxiliares-----------------------%
%a soma_pesos adaptado

soma_pesos([],[],0).
soma_pesos([Cidade|LC],LP,PesoAc):- idArmazem('Matosinhos', IdArmazem),
    Cidade == IdArmazem, !,soma_pesos(LC,LP,PesoAc).
soma_pesos([Cidade|LC],[PesoAc|LP],PesoAc):-
    soma_pesos(LC,LP,PesoAc1),entrega(_,_,Peso,Cidade,_,_),PesoAc is Peso+PesoAc1.

%b acrescenta_tara adaptado
acrescenta_tara_camiao(NomeCamiao,LPesos,LTara):- carateristicasCam(NomeCamiao,Tara,_,_,_,_),
acrescenta_tara_camiao2(Tara,LPesos,LTara),!.
acrescenta_tara_camiao2(Tara,[],[Tara]).
acrescenta_tara_camiao2(Tara,[Peso|LP],[PesoTara|LPT]):-
    acrescenta_tara_camiao2(Tara,LP,LPT), 
    PesoTara is Peso+Tara.

%Obter lista de armazém a partir da lista de id de entregas
percorrer_LE([],[]).
percorrer_LE([X|LE],[Y|LC]):- entrega(X,_,_,Y,_,_),!, percorrer_LE(LE,LC). 

%Conversão do tempo para resultado final
convert_minutes(Custo,ResultHour,ResultMinutes,ResultSeconds):- CustoHour is Custo/60, ResultHour is round(CustoHour),         
                                                        CustoMinutes is float_fractional_part(CustoHour)*60, ResultMinutes is round(CustoMinutes),
                                                        CustoSeconds is float_fractional_part(CustoMinutes)*60 , ResultSeconds is round(CustoSeconds). 


%--------------Predicado Principal ---------------------%

intervalo_minorante_majorante(LE,Minorante,Majorante):-

somatorio_majorante(eTruck01,LE,Majorante), somatorio_minorante(eTruck01,LE,Minorante),

convert_minutes(Minorante,ResultHour,ResultMinutes,ResultSeconds), write('Minorante- '),write(ResultHour),write('h '),write(ResultMinutes),write('min '),write(ResultSeconds),write('s'),nl,
convert_minutes(Majorante,ResultHour2,ResultMinutes2,ResultSeconds2), write('Majorante- '),write(ResultHour2),write('h '),write(ResultMinutes2),write('min '),write(ResultSeconds2),write('s'),nl,
write('Interval = ['),write(Minorante),write(' , '),write(Majorante),write( ']').


%---------------------Majorante  -------------------%


somatorio_majorante(NomeCamiao,LE,TotalMajorante):- percorrer_LE(LE,LC),
            idArmazem('Matosinhos',Cin),
            append([Cin|LC],[Cin],LCcompleto),
            soma_consumo_carga(NomeCamiao,LCcompleto,_,TotalTempoCarga),
            soma_tempo_max(NomeCamiao,LCcompleto,TotalTempoMax),
            TotalMajorante is TotalTempoCarga + TotalTempoMax,!.



%--------------- Tempo carga-----------------%
soma_consumo_carga(NomeCamiao,LC,TotalCarga,TotalTempo):- 
  soma_consumo_carga2(NomeCamiao,LC,LC,TotalCarga,TotalTempoAc),
  soma_tempo_descarga(NomeCamiao,LC,TotalDescarga),
     Carga is TotalCarga - (80-16)  ,
     TotalTempoCarga is (Carga * 60) / 48 ,
  TotalTempo is TotalDescarga + TotalTempoCarga + TotalTempoAc, 
  !.

soma_consumo_carga2(_,[_],_,0,0).
soma_consumo_carga2(NomeCamiao,[C|LC],LH,TotalCarga,TotalTempo):-
     soma_consumo_carga2(NomeCamiao,LC,LH,TotalCarga1,TotalTempo1),
     consumo_max(NomeCamiao,LH,C,_,EnergiaMax), 
     tempo_adicional_max(NomeCamiao,LH,C,_,TempoAdicional),
      
      TotalCarga is EnergiaMax + TotalCarga1,

      
      TotalTempo is  TempoAdicional + TotalTempo1.






%------------------Consumo Max--------------------%



consumo_max(NomeCamiao,LC,CInicial,Cidade,EnergiaMax):-
soma_pesos(LC,_,TotalPeso),
consumo_max2(NomeCamiao,LC,CInicial,TotalPeso,Cidade,EnergiaMax),!.


consumo_max2(_,[],_,_,_,0).
consumo_max2(NomeCamiao,[CInicial|LC],CInicial,PesoTotal,Cidade,EnergiaMax):- !, 
    consumo_max2(NomeCamiao,LC,CInicial,PesoTotal,Cidade,EnergiaMax).

consumo_max2(NomeCamiao,[C|LC],CInicial,PesoTotal,Cidade,EnergiaMax):- 
    idArmazem('Matosinhos', IdArmazem),
    C == IdArmazem,!, 
    consumo_max2(NomeCamiao,LC,CInicial,PesoTotal,Cidade,EnergiaMax).

consumo_max2(NomeCamiao,[C|LC],CInicial,TotalPeso,Cidade,EnergiaMax):-  idArmazem('Matosinhos', IdArmazem),
    CInicial == IdArmazem,!, 
    dadosCam_t_e_ta(_,CInicial,C,_,Energia,_),                                                             
    carateristicasCam(_,Tara,Capacidade,_,_,_),                                                                         
    entrega(_,_,_,C,_,_), 
    PT is TotalPeso  + Tara,                                                                         
    EnergiaNecessaria is Energia * PT / (Tara + Capacidade), 
    consumo_max2(NomeCamiao,LC,CInicial,TotalPeso,Cidade1,EnergiaMax1),
    
    (EnergiaNecessaria > EnergiaMax1 ,!, EnergiaMax is EnergiaNecessaria , Cidade is C
      ;
    EnergiaMax is EnergiaMax1, Cidade is Cidade1 ) .

   
consumo_max2(NomeCamiao,[C|LC],CInicial,TotalPeso,Cidade,EnergiaMax):- 
   
    dadosCam_t_e_ta(_,CInicial,C,_,Energia,_),                                                             
    carateristicasCam(_,Tara,Capacidade,_,_,_),                                                                         
    entrega(_,_,Peso,C,_,_),  
    PT is (TotalPeso - Peso) + Tara,                                                                         
    EnergiaNecessaria is Energia * PT / (Tara + Capacidade), 
   
    consumo_max2(NomeCamiao,LC,CInicial,TotalPeso,Cidade1,EnergiaMax1),
    
    (EnergiaNecessaria > EnergiaMax1 ,!, EnergiaMax is EnergiaNecessaria , Cidade is C
      ;
    EnergiaMax is EnergiaMax1, Cidade is Cidade1 ) .


% -------------------Verificar maior tempo adicional ------------- %
tempo_adicional_max(_,[],_,_,-1).
tempo_adicional_max(NomeCamiao,[CInicial|LC],CInicial,Cidade,TempAddMax):- !, 
    tempo_adicional_max(NomeCamiao,LC,CInicial,Cidade, TempAddMax).

tempo_adicional_max(NomeCamiao,[C|LC],CInicial,Cidade,TempAddMax):-  
    tempo_adicional_max(NomeCamiao,LC,CInicial,Cidade1, TempAddMax1),
      
        (dadosCam_t_e_ta(NomeCamiao,CInicial,C,_,_,TempAdd)),

      (TempAdd > TempAddMax1,!,TempAddMax is TempAdd, Cidade is C; TempAddMax is TempAddMax1, Cidade is Cidade1).







% ----------------------------Somatório Trajeto -------------------------%

soma_tempo_max(NomeCamiao,LC,TotalTempo):- 
soma_tempo_max2(NomeCamiao,LC,LC,TotalTempo),!.

soma_tempo_max2(_,[_],_,0).
soma_tempo_max2(NomeCamiao,[C|LC],LH,TotalTempo):-
     soma_tempo_max2(NomeCamiao,LC,LH,TotalTempo1),
     custo_max(NomeCamiao,LH,C,_,TempMax),
    TotalTempo is TempMax + TotalTempo1.

%--------------------Custo Trajeto---------------------------------%
custo_max(NomeCamiao,LC,CInicial,Cidade,TempMax):- soma_pesos(LC,_,Total),

custo_max2(NomeCamiao,LC,CInicial,Total,Cidade,TempMax),!.

custo_max2(_,[],_,_,_,0):-!.
custo_max2(NomeCamiao,[CInicial|LC],CInicial,PesoTotal,Cidade,TempMax):- !, 
    custo_max2(NomeCamiao,LC,CInicial,PesoTotal,Cidade, TempMax).

custo_max2(NomeCamiao,[C|LC],CInicial,PesoTotal,Cidade,TempMax):- idArmazem('Matosinhos', IdArmazem),
    C == IdArmazem,!,
      custo_max2(NomeCamiao,LC,CInicial,PesoTotal,Cidade1, TempMax1),
 
      (dadosCam_t_e_ta(NomeCamiao,CInicial,C,TempT,_,_),
      carateristicasCam(NomeCamiao,Tara,Carga,_,_,_)),
        CargaT is Carga + Tara,
        PesoAc is PesoTotal,
        TempAj is (PesoAc+Tara) * TempT/CargaT,

      (TempAj > TempMax1,!,TempMax is TempAj, Cidade is C; TempMax is TempMax1, Cidade is Cidade1).

    

custo_max2(NomeCamiao,[C|LC],CInicial,PesoTotal,Cidade,TempMax):-  
    custo_max2(NomeCamiao,LC,CInicial,PesoTotal,Cidade1, TempMax1),
      
        (dadosCam_t_e_ta(NomeCamiao,CInicial,C,TempT,_,_),
      carateristicasCam(NomeCamiao,Tara,Carga,_,_,_),
      entrega(_,_,Peso,C,_,_)),
        CargaT is Carga + Tara,
        PesoAc is PesoTotal-Peso,
        TempAj is (PesoAc+Tara) * TempT/CargaT,

      (TempAj > TempMax1,!,TempMax is TempAj, Cidade is C; TempMax is TempMax1, Cidade is Cidade1).








% -----------------------Minorante Cálculo do Minorante----------------------------%

%Somatorio das parcelas de tempo (tempo de carga + tempo do trajeto) para o minorante 

somatorio_minorante(NomeCamiao,LE,TotalMinorante):- 
    percorrer_LE(LE,LC),
    idArmazem('Matosinhos',Cin),
    append([Cin|LC],[Cin],LCcompleto),
    soma_tempo_descarga(NomeCamiao,LCcompleto,TotalCarga),

    soma_tempo_min(NomeCamiao,LCcompleto,TotalTempo),
    TotalMinorante is TotalCarga + TotalTempo,!.

%Somatorio da Parcela de tempo da carga ---> Apenas é considerado o tempo de descarga. 
soma_tempo_descarga(_,[],0):-!.
soma_tempo_descarga(NomeCamiao,[C|LC],TotalCarga):- idArmazem('Matosinhos', IdArmazem),
    C == IdArmazem,!, soma_tempo_descarga(NomeCamiao,LC,TotalCarga).
soma_tempo_descarga(NomeCamiao,[C|LC],TotalCarga):- 
    soma_tempo_descarga(NomeCamiao,LC,TotalCarga1),
    entrega(_,_,_,C,_,TempR),
    TotalCarga is TempR + TotalCarga1.

%Somatorio da parcela do tempo do Trajeto
soma_tempo_min(NomeCamiao,LC,TotalTempo):- 
soma_tempo_min2(NomeCamiao,LC,LC,TotalTempo),!.

soma_tempo_min2(_,[_],_,0).
soma_tempo_min2(NomeCamiao,[C|LC],LH,TotalTempo):-
     soma_tempo_min2(NomeCamiao,LC,LH,TotalTempo1),
     custo_min(NomeCamiao,LH,C,_,TempMin),
    TotalTempo is TempMin + TotalTempo1.

%Cálculo do Custo Minimo vindo de uma cidade inicial 
custo_min(NomeCamiao,LC,CInicial,Cidade,TempMin):- soma_pesos(LC,_,Total),

custo_min2(NomeCamiao,LC,CInicial,Total,Cidade,TempMin).

custo_min2(_,[],_,_,_,1000).
custo_min2(NomeCamiao,[CInicial|LC],CInicial,PesoTotal,Cidade,TempMin):- !,  %Caso de o id de armazém da lista coincide com a cidade origem e avança na lista
    custo_min2(NomeCamiao,LC,CInicial,PesoTotal,Cidade, TempMin).

custo_min2(NomeCamiao,[C|LC],CInicial,PesoTotal,Cidade,TempMin):-  %Caso de o id de armazém da lista coincide com o id do armazém de Matosinhos
    idArmazem('Matosinhos', IdArmazem),
    C == IdArmazem,!,
    custo_min2(NomeCamiao,LC,CInicial,PesoTotal,Cidade, TempMin).   


custo_min2(NomeCamiao,[C|LC],CInicial,PesoTotal,Cidade,TempMin):-  
    custo_min2(NomeCamiao,LC,CInicial,PesoTotal,Cidade1, TempMin1),
      
        (dadosCam_t_e_ta(NomeCamiao,CInicial,C,TempT,_,_),
      carateristicasCam(NomeCamiao,Tara,Carga,_,_,_),
      entrega(_,_,Peso,C,_,_)),
        CargaT is Carga + Tara,
        PesoAc is PesoTotal-Peso,
        TempAj is (PesoAc+Tara) * TempT/CargaT,

      (TempMin1 > TempAj,!,TempMin is TempAj, Cidade is C; TempMin is TempMin1, Cidade is Cidade1).



