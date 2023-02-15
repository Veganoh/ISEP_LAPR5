using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace DDDSample1.Domain.Armazens
{
    //Classe id do Armazem, Responsavel por guardar uma string que serve como o identificador unico
    public class ArmazemID : EntityId
    {
        [JsonConstructor]
        public ArmazemID(Guid value) : base(value)
        {
        }

        public ArmazemID(String value) : base(value)
        {
            string pattern = "^[a-zA-Z0-9]{3}$";
            if(String.IsNullOrEmpty(value) || !Regex.Match(value, pattern).Success)
                throw new BusinessRuleValidationException("O identificador de um Armazem tem de ter 3 characteres alfanumericos");
        }

        override
        protected  Object createFromString(String text){
            return text;
        }

        override
        public String AsString(){
            return ObjValue.ToString();
        }
        
       
        public Guid AsGuid(){
            return (Guid) base.ObjValue;
        }
    }
}