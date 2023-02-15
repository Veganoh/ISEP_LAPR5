DROP TABLE Armazens CASCADE;
DROP TABLE Entregas CASCADE;

CREATE TABLE Armazens
(
    Identificador   VARCHAR(255)
        PRIMARY KEY,
    Designacao VARCHAR(255)
        NOT NULL,
    Endereco VARCHAR(255)
        NOT NULL
        UNIQUE,
    Latitude DOUBLE
        NOT NULL,
        CHECK (Latitude BETWEEN -90 AND 90),
    Longitude DOUBLE
        NOT NULL,
        CHECK (Latitude BETWEEN -180 AND 180),
    Altitude INTEGER
        NOT NULL,
        CHECK (Altitude >= 0)
    Ativo BOOLEAN
);

CREATE TABLE Entregas
(
    identificador   VARCHAR(255)
        PRIMARY KEY,
    data    DATETIME
        NOT NULL,
    id_armazem   VARCHAR(255),
    peso_entrega FLOAT
        NOT NULL,
    tempo_colocacao INTEGER
        NOT NULL,
        CHECK (tempo_colocacao > 0),
    tempo_retirada INTEGER
        NOT NULL,
        CHECK (tempo_retirada > 0)
);

ALTER TABLE Entregas
ADD CONSTRAINT FK_ID_Armazem
FOREIGN KEY (id_armazem) REFERENCES Armazens(Identificador);