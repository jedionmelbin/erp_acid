# ERP ACD Instalación y configuración

El software se desarrolló  en el año 2014, con el fin de ayudar a las empresas a gestionar sus recursos administrativos desde pequeños tiendas que manejan compras y ventas, con facturación electronica integrado a los servisio de SUNAT PERU, a continuación detallamos los módulos: 

## Modulos del sistema
- Gestión de almacen
   - Ingresos
   - Salidas
   - Transferencias
   - Stock
   - Kardex
   
- Gestión de compras
  - Orden de compra
  - Registro de compra
- Gestión de ventas
  - Facturación electronica (A4,A5, Ticket)
  - Boleta electronica (A4,A5, Ticket)
  - Nota de credito (A4,A5, Ticket)
  - Nota de debíto (A4,A5, Ticket)
  - Guia de remision electronica
- Gestión financiera
- Gestión de seguridad
  - Empresas
  - Usuario


## Instalación en servidores IIS
Para realizar la instalación de manera local necesitamos los siguientes requisitos:

### Software
- Microsoft Net Framework 4.6 o superior
- Microsoft Windows 10,11 o Windows Server 2012 o superior
- Microsoft SQL Server 2014 o superior

### Hardware
- Servidor con 500 GB De disco HDD or SDD
- Procesador de 2 Cores
- Memoria RAM de 4GB o superior


### Configuración de Web config cadena de conexión al servidor de Base de datos MSSQL

```
  <connectionStrings>
	  <!--Local -->
	  <add name="DefaultConnection" connectionString="Server={{server}};Database={{base_de_Datos}};User ID=sa;Password=password;TrustServerCertificate=True;Trusted_Connection=False;Connection Timeout=60;Integrated Security=False;Persist Security Info=False;Encrypt=True;MultipleActiveResultSets=True;" providerName="System.Data.SqlClient" />
	
  </connectionStrings>
```

- El la sección server debe poner la Ip del servidor de base de datos
- En la sección database debe ir la base de datos restaurado previamente del la carpeta app_data
- En la seccion  "ID" debe ir el usuario de base datos
- La ultima seccion Password: Contraseña de base de datos
