using DDDSample1.Domain.Shared;
using System.Text.RegularExpressions;

namespace DDDSample1.Domain.Armazens
{
    public class Endereco : IValueObject
    {
        //Endereco do Armazem
        public string endereco { get;  private set; }

        public Endereco(string endereco)
        {
            string pattern = "^([a-zA-Z ]+,){2}( *[0-9]{4}-)[0-9]{3}$";
            if(!string.IsNullOrEmpty(endereco) && Regex.Match(endereco, pattern).Success)
                this.endereco = endereco;
            else
                throw new BusinessRuleValidationException("Este formato de endeço não é suportado");
        }
    }
}