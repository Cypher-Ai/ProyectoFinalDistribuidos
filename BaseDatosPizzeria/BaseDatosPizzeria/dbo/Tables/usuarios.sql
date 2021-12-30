CREATE TABLE [dbo].[usuarios] (
    [Id]              INT       IDENTITY (1, 1) NOT NULL,
    [nombre]          CHAR (50) NULL,
    [apellidos]       CHAR (50) NULL,
    [telefono]        INT       NULL,
    [nrodni]          INT       NULL,
    [correo]          CHAR (50) NULL,
    [fechanacimiento] CHAR (20) NULL,
    [direccion]       CHAR (50) NULL,
    [contraseña]      CHAR (30) NULL,
    PRIMARY KEY CLUSTERED ([Id] ASC)
);



