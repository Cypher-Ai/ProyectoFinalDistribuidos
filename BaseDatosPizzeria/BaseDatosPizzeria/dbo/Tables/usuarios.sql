CREATE TABLE [dbo].[usuarios] (
    [idusuario]          INT          IDENTITY (1, 1) NOT NULL,
    [nombres]            VARCHAR (30) NOT NULL,
    [apellidos]          VARCHAR (30) NOT NULL,
    [nrodni]             VARCHAR (30) NOT NULL,
    [telefono]           VARCHAR (30) NOT NULL,
    [correo]             VARCHAR (30) NOT NULL,
    [fechanacimiento]    VARCHAR (30) NOT NULL,
    [direccion]          VARCHAR (30) NOT NULL,
    [contraseniausuario] VARCHAR (30) NOT NULL,
    PRIMARY KEY CLUSTERED ([idusuario] ASC)
);

