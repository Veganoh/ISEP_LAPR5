using DDDSample1.Domain.Armazens;
using DDDSample1.Domain.Shared;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using MySql.Data.MySqlClient;

namespace DDDSample1.Infrastructure.Armazens
{
    public class ArmazemRepositorio : IArmazemRepositorio
    {
        //A conecção com a  base de dados
        private MySqlConnection con;

        public ArmazemRepositorio(MySQLSchema SchemaName){
            con = SchemaName.EstablishConnection();
        }
        
        //Faz uma conecção com a base de dados e com uma query 'Select' retorna todos os Armazens encontrados
        public async Task<List<Armazem>> GetAllAsyncAtivos(){
            List<Armazem> armazens = new List<Armazem>();

            try
            {
                con.Open();

                string sql = "SELECT Identificador, Designacao, Endereco, Latitude, Longitude, Altitude, Ativo FROM Armazens WHERE Ativo = true";

                MySqlCommand cmd = new MySqlCommand(sql, con);
                MySqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    ArmazemID armId = new ArmazemID(Convert.ToString(rdr[0]));
                    Designacao designacao = new Designacao(Convert.ToString(rdr[1]));
                    Endereco endereco = new Endereco(Convert.ToString(rdr[2]));
                    Coordenadas coordenadas = new Coordenadas( Convert.ToDouble(rdr[3]), Convert.ToDouble(rdr[4]));
                    Altitude altitude = new Altitude(Convert.ToInt32(rdr[5]));
                    Ativo ativo = new Ativo(Convert.ToBoolean(rdr[6]));
                    armazens.Add(new Armazem(armId, designacao, endereco, coordenadas, altitude, ativo)); 
                }    
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            con.Close();
            return await Task.FromResult<List<Armazem>>(armazens);
        }

        public async Task<List<Armazem>> GetAllAsync(){
            List<Armazem> armazens = new List<Armazem>();

            try
            {
                con.Open();

                string sql = "SELECT Identificador, Designacao, Endereco, Latitude, Longitude, Altitude, Ativo FROM Armazens";

                MySqlCommand cmd = new MySqlCommand(sql, con);
                MySqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    ArmazemID armId = new ArmazemID(Convert.ToString(rdr[0]));
                    Designacao designacao = new Designacao(Convert.ToString(rdr[1]));
                    Endereco endereco = new Endereco(Convert.ToString(rdr[2]));
                    Coordenadas coordenadas = new Coordenadas( Convert.ToDouble(rdr[3]), Convert.ToDouble(rdr[4]));
                    Altitude altitude = new Altitude(Convert.ToInt32(rdr[5]));
                    Ativo ativo = new Ativo(Convert.ToBoolean(rdr[6]));
                    armazens.Add(new Armazem(armId, designacao, endereco, coordenadas, altitude, ativo)); 
                }    
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            con.Close();
            return await Task.FromResult<List<Armazem>>(armazens);
        }

        //Faz uma conecção com a base de dados e com uma query 'Select where' retorna todos O armazem com o id fornecido
        public async Task<Armazem> GetByIdAsync(ArmazemID id){

            Armazem armazem = null;

            try
            {

                string sql = "SELECT Identificador, Designacao, Endereco, Latitude, Longitude, Altitude, Ativo FROM Armazens " + 
                             "Where Identificador = '" + id.AsString() + "'";

                armazem = procurarArmazem(sql);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }
            
            return await Task.FromResult<Armazem>(armazem);

        }

        //Faz uma conecção com a base de dados e com uma query 'Select where' retorna todos O armazem com a designacao fornecido
        public async Task<Armazem> GetByDesignacaoAsync(Designacao Designaca){

            Armazem armazem = null;

            try
            {

                string sql = "SELECT Identificador, Designacao, Endereco, Latitude, Longitude, Altitude, Ativo FROM Armazens " + 
                             "Where Designacao = '" + Designaca.designacao + "'";

                

                armazem = procurarArmazem(sql);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.ToString());
            }

            return await Task.FromResult<Armazem>(armazem);

        }

        //Metodo usado para diminuir duplicação
        private Armazem procurarArmazem(string query){
            con.Open();

            MySqlCommand cmd = new MySqlCommand(query, con);
            MySqlDataReader rdr = cmd.ExecuteReader();

            if(!rdr.HasRows)
                return null;
                
            rdr.Read();

            ArmazemID armId = new ArmazemID(Convert.ToString(rdr[0]));
            Designacao designacao = new Designacao(Convert.ToString(rdr[1]));
            Endereco endereco = new Endereco(Convert.ToString(rdr[2]));
            Coordenadas coordenadas = new Coordenadas( Convert.ToDouble(rdr[3]), Convert.ToDouble(rdr[4]));
            Altitude altitude = new Altitude(Convert.ToInt32(rdr[5]));
            Ativo ativo = new Ativo(Convert.ToBoolean(rdr[6]));
            con.Close();
            return new Armazem(armId, designacao, endereco, coordenadas, altitude, ativo);
        }

        //Adiciona o objeto Armazem a base de dados
        public async Task<Armazem> AddAsync(Armazem obj){
            try
            {
                con.Open();

                string sql = String.Format("INSERT INTO Armazens(Identificador, Designacao, Endereco, Latitude, Longitude, Altitude, Ativo) " + 
                                            "VALUES ('{0}','{1}','{2}',{3},{4},{5},{6})", obj.Id.AsString(), obj.Designacao.designacao, obj.Endereco.endereco, 
                                            obj.Coordenadas.latitude.ToString("F", System.Globalization.CultureInfo.InvariantCulture), 
                                            obj.Coordenadas.longitude.ToString("F", System.Globalization.CultureInfo.InvariantCulture),
                                            obj.Altitude.altitude, obj.isAtivo());

                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.ExecuteNonQuery();
            }
            catch (Exception)
            {
                throw new Exception("Identificador ou Designação duplicada");
            }

            con.Close();
            return await Task.FromResult<Armazem>(obj);
        }

        //Usa a query 'Update' para atualizar o armazem na base de dados
        public async Task<Armazem> UpdateAsync(Armazem obj){
            try
            {
                con.Open();

                string sql = String.Format("UPDATE Armazens SET Designacao = '{0}', Endereco = '{1}', Latitude = {2}, Longitude = {3}, Altitude = {4} " + 
                                            "WHERE Identificador = '{5}'", obj.Designacao.designacao, obj.Endereco.endereco, 
                                            obj.Coordenadas.latitude.ToString("F", System.Globalization.CultureInfo.InvariantCulture), 
                                            obj.Coordenadas.longitude.ToString("F", System.Globalization.CultureInfo.InvariantCulture),
                                            obj.Altitude.altitude, obj.Id.AsString());

                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.ExecuteNonQuery();
            }
            catch (Exception)
            {
                throw new Exception("Algo correu mal ao atualizar o Armazem");
            }

            con.Close();
            return await Task.FromResult<Armazem>(obj);
        }

        //Remove o objeto da base de dados caso ele exista
        public void Remove(Armazem obj){
            try
            {
                con.Open();

                string sql = String.Format("DELETE FROM Armazens WHERE Identificador = '" + obj.Id.AsString() + "'");

                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception)
            {
                throw new Exception("Existe uma entrega que usa este armazem");
            }
        }

        //Muda o valor da atividade do objeto da base de dados caso ele exista
        public void MudarAtividade(Armazem obj){
            try
            {
                con.Open();

                string sql = String.Format("UPDATE Armazens SET Ativo = {0} WHERE identificador = '{1}'", obj.isAtivo().ToString(), obj.Id.AsString());

                MySqlCommand cmd = new MySqlCommand(sql, con);
                cmd.ExecuteNonQuery();
                con.Close();
            }
            catch (Exception)
            {
                throw new Exception("Armazem não existe");
            }
        }

    }
}