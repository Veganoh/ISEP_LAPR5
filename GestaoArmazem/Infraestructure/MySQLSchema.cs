using MySql.Data.MySqlClient;

namespace DDDSample1.Infrastructure
{
    //This class is used to store the MySql database connection string and to return a new connection whenever a service is called
   public class MySQLSchema
    {
        const string SchemaName = "server=vs981.dei.isep.ipp.pt;userid=root;password=BP199X74ZNkF;database=mysql";

        // Creates a new connection to the MySql Database
        public MySqlConnection EstablishConnection(){
            return new MySqlConnection(SchemaName);
        }
    }
}