function validaCPF(cpfEnviado) {
  Object.defineProperty(this, 'cpfLimpo', {
    enumerable: true,
    get: function () {
      return cpfEnviado.replace(/\D+/g, '');
    },
  });
}

validaCPF.prototype.valida = function () {
  if (typeof this.cpfLimpo === 'undefined') return false;
  if (this.cpfLimpo.length !== 11) return false;
  if (this.isSequecial()) return false;

  const cpfParcial = this.cpfLimpo.slice(0, -2);
  const digit01 = this.criarDigito(cpfParcial);
  const digit02 = this.criarDigito(cpfParcial + digito1);

  const novoCpf = cpfParcial + digito1 + digito2;

  return novoCpf === this.cpfLimpo;
};

//criar o digito
validaCPF.prototype.criarDigito = function (cpfParcial) {
  const cpfArray = Array.from(cpfParcial);

  let regressivo = cpfArray.length + 1;
  const total = cpfArray.reduce((ac, val) => {
    ac += regressivo * Number(val);
    regressivo--;
    return ac;
  }, 0);

  const digito = 11 - (total % 11);
  return digito > 9 ? '0' : String(digito);
};

// verificar a sequencia
validaCPF.prototype.isSequecial = function () {
  const sequencia = this.cpfLimpo[0].repeat(this.cpfLimpo.length);
  return sequencia === this.cpfLimpo;
};

const cpf = new validaCPF('705.484.450-52');

if (cpf.valida()) {
  console.log('Cpf valido');
} else {
  console.log('cpf invalido');
}
