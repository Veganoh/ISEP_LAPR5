using System;
using DDDSample1.Domain.Shared;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace DDDSample1.Domain.Entregas
{
    public class EntregaID : EntityId
    {
        [JsonConstructor]
        public EntregaID(Guid value) : base(value)
        {
        }

        public EntregaID(String value) : base(value)
        {
            
            if(String.IsNullOrEmpty(value))
               throw new BusinessRuleValidationException("O identificador de uma Entrega tem de ter 3 characteres alfanumericos");
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