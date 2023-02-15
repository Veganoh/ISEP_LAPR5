using DDDSample1.Domain.Entregas;
using DDDSample1.Domain.Armazens;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using MySql.Data.MySqlClient;

namespace DDDSample1.Infrastructure.Entregas
{
        public class EntregaRepositorio : IEntregaRepositorio
    {
        //A conecção com a  base de dados
        private MySqlConnection con;

        public EntregaRepositorio(MySQLSchema SchemaName){
            con = SchemaName.EstablishConnection();
        }
        
        //Faz uma conecção com a base de dados e com uma query 'Select' retorna todas as entregas encontradas
        public async Task<List<Entrega>> GetAllAsync(){
            List<Entrega> entregas = new List<Entrega>();

            try
            {
                con.Open();

                string sql = "SELECT identificador,data,peso_entrega,id_armazem,tempo_colocacao,tempo_retirada FROM Entregas";

                MySqlCommand cmd = new MySqlCommand(sql, con);
                MySqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    EntregaID entregaId = new EntregaID(Convert.ToString(rdr[0]));
                    string data = Convert.ToString(rdr[1]);
                    float peso = Convert.ToSingle(Convert.ToString(rdr[2]));
                    ArmazemID armId = new ArmazemID(Convert.ToString(rdr[3]));
                    int tempo_col = Convert.ToInt32(rdr[4]);
                    int tempo_ret = Convert.ToInt32(rdr[5]);
                    Entrega entrega = new Entrega(entregaId, data, peso, armId, tempo_col, tempo_ret);
                    entregas.Add(new Entrega(entregaId, data, peso, armId, tempo_col, tempo_ret)); 
                    
                }    
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            con.Close();
            return await Task.FromResult<List<Entrega>>(entregas);
        }

        //Faz uma conecção com a base de dados e com uma query 'Select' retorna todas as entregas encontradas
        public async Task<List<Entrega>> GetAllByArmIdAsync(ArmazemID id_arm){
            List<Entrega> entregas = new List<Entrega>();

            try
            {
                con.Open();

                string sql = "SELECT identificador,data,peso_entrega,id_armazem,tempo_colocacao,tempo_retirada FROM Entregas " + 
                             "Where id_armazem = '" + id_arm.AsString() + "'";

                MySqlCommand cmd = new MySqlCommand(sql, con);
                MySqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    EntregaID entregaId = new EntregaID(Convert.ToString(rdr[0]));
                    string data = Convert.ToString(rdr[1]);
                    float peso = Convert.ToSingle(Convert.ToString(rdr[2]));
                    ArmazemID armId = new ArmazemID(Convert.ToString(rdr[3]));
                    int tempo_col = Convert.ToInt32(rdr[4]);
                    int tempo_ret = Convert.ToInt32(rdr[5]);
                    Entrega entrega = new Entrega(entregaId, data, peso, armId, tempo_col, tempo_ret);
                    entregas.Add(new Entrega(entregaId, data, peso, armId, tempo_col, tempo_ret)); 
                    
                }    
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            con.Close();
            return await Task.FromResult<List<Entrega>>(entregas);
        }

        public async Task<List<Entrega>> GetAllBetweenDatesAsync(DateTime data_inicio, DateTime data_fim){
            List<Entrega> entregas = new List<Entrega>();

            try
            {
                con.Open();

                string sql = "SELECT identificador,data,peso_entrega,id_armazem,tempo_colocacao,tempo_retirada FROM Entregas "+
                              "WHERE data BETWEEN '"+ data_inicio.ToString("yyyy/MM/dd HH:mm:ss") +"'AND'"+ data_fim.ToString("yyyy/MM/dd HH:mm:ss") +"'";

                MySqlCommand cmd = new MySqlCommand(sql, con);
                MySqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    EntregaID entregaId = new EntregaID(Convert.ToString(rdr[0]));
                    string data = Convert.ToString(rdr[1]);
                    float peso = Convert.ToSingle(Convert.ToString(rdr[2]));
                    ArmazemID armId = new ArmazemID(Convert.ToString(rdr[3]));
                    int tempo_col = Convert.ToInt32(rdr[4]);
                    int tempo_ret = Convert.ToInt32(rdr[5]);
                    Entrega entrega = new Entrega(entregaId, data, peso, armId, tempo_col, tempo_ret);
                    entregas.Add(new Entrega(entregaId, data, peso, armId, tempo_col, tempo_ret)); 
                    
                }    
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            con.Close();
            return await Task.FromResult<List<Entrega>>(entregas);
        }

        public async Task<List<Entrega>> GetSortAsync(string atribute){
            List<Entrega> entregas = new List<Entrega>();
            

            try
            {
                con.Open();

                string sql = "SELECT identificador,data,peso_entrega,id_armazem,tempo_colocacao,tempo_retirada FROM Entregas";

                if(atribute != null && !atribute.Equals("data")){
                    sql = "SELECT identificador,data,peso_entrega,id_armazem,tempo_colocacao,tempo_retirada FROM Entregas "+
                             " ORDER BY "+ atribute +" ASC";
                }else if(atribute != null && atribute.Equals("data")){
                    sql = "SELECT identificador,data,peso_entrega,id_armazem,tempo_colocacao,tempo_retirada FROM Entregas "+
                             " ORDER BY "+ atribute +" DESC";
                }
                
                MySqlCommand cmd = new MySqlCommand(sql, con);
                MySqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    EntregaID entregaId = new EntregaID(Convert.ToString(rdr[0]));
                    string data = Convert.ToString(rdr[1]);
                    float peso = Convert.ToSingle(Convert.ToString(rdr[2]));
                    ArmazemID armId = new ArmazemID(Convert.ToString(rdr[3]));
                    int tempo_col = Convert.ToInt32(rdr[4]);
                    int tempo_ret = Convert.ToInt32(rdr[5]);
                    Entrega entrega = new Entrega(entregaId, data, peso, armId, tempo_col, tempo_ret);
                    entregas.Add(new Entrega(entregaId, data, peso, armId, tempo_col, tempo_ret)); 
                    
                }    
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            con.Close();
            return await Task.FromResult<List<Entrega>>(entregas);
        }

        //Faz uma conecção com a base de dados e com uma query 'Select where' retorna a entrega com o id fornecido
        public async Task<Entrega> GetByIdAsync(EntregaID id){

            Entrega entrega = null;

            try
            {
                con.Open();

                string sql = "SELECT identificador,data,peso_entrega,id_armazem,tempo_colocacao,tempo_retirada FROM Entregas " + 
                             "Where identificador = '" + id.AsString() + "'";

                MySqlCommand cmd = new MySqlCommand(sql, con);
                MySqlDataReader rdr = cmd.ExecuteReader();

                if(!rdr.HasRows)
                    return null;
                    
                rdr.Read();

                EntregaID entregaId = new EntregaID(Convert.ToString(rdr[0]));
                string data = Convert.ToString(rdr[1]);
                float peso = Convert.ToSingle(rdr[2]);
                ArmazemID armId = new ArmazemID(Convert.ToString(rdr[3]));
                int tempo_col = Convert.ToInt32(rdr[4]);
                int tempo_ret = Convert.ToInt32(rdr[5]);

                entrega = new Entrega(entregaId, data, peso, armId, tempo_col, tempo_ret);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            con.Close();
            return await Task.FromResult<Entrega>(entrega);

        }

        //Adiciona o objeto entrega a base de dados
        public async Task<Entrega> AddAsync(Entrega obj){
            try
            {
                con.Open();

                string sql_count = String.Format("SELECT COUNT(identificador) FROM Entregas ");
                MySqlCommand cmd_count = new MySqlCommand(sql_count, con);
                MySqlDataReader rdr = cmd_count.ExecuteReader();

                if(!rdr.HasRows)
                    return null;
                    
                rdr.Read();

                string id = Convert.ToString(rdr[0]);
                con.Close();

                con.Open();
                 
                string sql = String.Format("INSERT INTO Entregas(identificador,data,peso_entrega,id_armazem,tempo_colocacao,tempo_retirada) " + 
                                            "VALUES ('{0}','{1:yyyy/MM/dd HH:mm:ss}',{2}, '{3}' , {4} , {5} )", id , obj.data, 
                                            obj.peso_entrega.peso_ent.ToString("F", System.Globalization.CultureInfo.InvariantCulture), 
                                            obj.id_armazem.AsString(), obj.tempo_colocacao.tempo,obj.tempo_retirada.tempo);

                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            con.Close();
            return await Task.FromResult<Entrega>(obj);
        }

        //Usa a query 'Update' para atualizar a entrega na base de dados
        public async Task<Entrega> UpdateAsync(Entrega obj){
            try
            {
                con.Open();
                //identificador,data,peso_entrega,id_armazem,tempo_colocacao,tempo_retirada
                string sql = String.Format("UPDATE Entregas SET data = '{0:yyyy/MM/dd HH:mm:ss}', peso_entrega = '{1}', id_armazem = '{2}', tempo_colocacao = {3}, tempo_retirada = {4} " + 
                                            "WHERE identificador = '{5}'", obj.data, obj.peso_entrega.peso_ent.ToString("F", System.Globalization.CultureInfo.InvariantCulture),
                                             obj.id_armazem.AsString(), obj.tempo_colocacao.tempo,obj.tempo_retirada.tempo, obj.Id.AsString());

                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            con.Close();
            return await Task.FromResult<Entrega>(obj);
        }

        //Remove o objeto da base de dados caso ele exista
        public void Remove(Entrega obj){
            try
            {
                con.Open();

                string sql = String.Format("DELETE FROM Entregas WHERE identificador = '" + obj.Id.AsString() + "'");

                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
        }


    


    }
}