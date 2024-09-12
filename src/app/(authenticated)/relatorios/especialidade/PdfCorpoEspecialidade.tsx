/* eslint-disable jsx-a11y/alt-text */
import { Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

export const PdfCorpoEspecialidade = ({ especialidades, img }) => {
  const especialidadesComMeta = organizarDados(especialidades);
  const especialidadesPagina = dividirEmDuasPartes(especialidadesComMeta);

  return (
    <>
      {especialidadesPagina.map((especialidades, index) => (
        <Pagina key={index} especialidadesPagina={especialidades} img={img} indexEspecialidade={index}/>
      ))}
    </>
  )
}

function organizarDados(especialidades) {
  const especialidadesComMeta = [];

  especialidades.map(especialidade => {
    if (especialidade.resultadosMensais[0].metaMensal > 0) {
      especialidadesComMeta.push(especialidade);
    }
  });

  return especialidadesComMeta;
}

function dividirEmDuasPartes(especialidadesComMeta) {
  const especialidadesPagina = [];

  for (let i = 0; i < especialidadesComMeta.length; i += 2) {
    especialidadesPagina.push(especialidadesComMeta.slice(i, i + 2));
  }

  return especialidadesPagina;
}

const Pagina = ({especialidadesPagina, img, indexEspecialidade}) => {
  return (
    <Page size="A4" style={styles.page}>
      {especialidadesPagina.map((especialidade, index) => (
        <Especialidade key={index} especialidade={especialidade} img={img} indexEspecialidade={indexEspecialidade} index={index}/>
      ))}
    </Page>
  )
}

const Especialidade = ({especialidade, img, indexEspecialidade, index}) => {
  const dadosMes = especialidade.resultadosMensais[0];
  const novoIndex = Number(indexEspecialidade) * 2 + index + 2;

  return (
    <View style={[styles.containerPagina]}>
      <Titulo especialidade={especialidade.especialidade}/>
      {descricao(dadosMes)}
      <Image
        src={img[novoIndex]}
        style={{ height: "322px", width: "552px", padding: "16px" }}
      />
    </View> 
  )
}

const Titulo = (especialidade) => {
  return (
    <Text style={styles.titulo}>
      {especialidade.especialidade}
    </Text>
  )
}

const descricao = (dadosMes) => {
  return (
    <View>
      <View style={{display: "flex",  flexDirection: "row", justifyContent: "space-between"}}>
        <View style={styles.descricao}>
          <View style={styles.componenteDescricao}>
            <Text style={styles.textDescriptionBold}>Total: </Text>
            <Text style={styles.textDescription}>{dadosMes.atendimentos} pacientes atendidos.</Text>
          </View>
          <View style={styles.componenteDescricao}>
            <Text style={styles.textDescriptionBold}>Meta Mensal: </Text>
            <Text style={styles.textDescription}>{dadosMes.metaMensal} pacientes.</Text>
          </View>
          <View style={styles.componenteDescricao}>
            <Text style={styles.textDescriptionBold}>Índice de Atendimento: </Text>
            <Text style={styles.textDescription}>{calcularPorcentagem(dadosMes.atendimentos, dadosMes.metaMensal)}%</Text>
          </View>
        </View>
          <Image
            src={"/logo.png"}
            style={{height: "40px", width: "40px", marginRight: "10px", marginTop: "8px"}}
          />
      </View>
      <View style={[styles.componenteDescricao, {marginTop: "8px"}]}>
        <Text style={styles.textDescription}>A especialidade {dadosMes.especialidade} atendeu {calcularPorcentagem(dadosMes.atendimentos, dadosMes.metaMensal)}% da meta mensal, com {calcularResultado(dadosMes)}</Text>
      </View>
    </View>
  )
}

const calcularPorcentagem = (atendidos, meta) => {
  if (meta === 0) {
    return 100;
  } else {
    const porcentagem = (atendidos / meta * 100);

    if (Number.isInteger(porcentagem)) {
      return porcentagem.toFixed(0).replace(".", ",");
    } else {
      return porcentagem.toFixed(2).replace(".", ",");
    }
  }
}

function calcularResultado(dadosMes) {
  const resultado = dadosMes.atendimentos - dadosMes.metaMensal;

  if (resultado > 0) {
    return `${resultado} atendimentos a mais do  que o esperado.`;
  } else if (resultado < 0) {
    return `${resultado * -1} atendimentos a menos do que o esperado.`;
  } else {
    return "100% da quantidade de atendimento esperada";
  }
}

function somarAtendimentos(especialidades) {
  let soma = 0;
  
  especialidades.map(especialidade => {
    especialidade.resultadosMensais[0].resultadosDiarios.map(resultadosDiario => {
      soma += resultadosDiario.atendimentos;
    });
  });

  return soma;
}

const styles = StyleSheet.create({
  page: {
    width: "100%",
    height: "100%",
    paddingHorizontal: "32px",
  },
  containerPagina: {
    display: "flex",  
    flexDirection: "column",
    width: "100%",
    height: "50%",
    borderBottom: "1px solid black",
  },
  titulo: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    fontWeight: 700,
    textAlign: "center",
    marginTop: "16px",
  },
  descricao: {
    display: "flex", 
    flexDirection: "column",
    marginTop: "16px",
  },
  componenteDescricao: {
    display: "flex", 
    flexDirection: "row"
  },
  textDescriptionBold: {
    fontFamily: 'Open Sans',
    fontSize: 10,
    lineHeight: 1.5,
    fontWeight: "bold"
  },
  textDescription: {
    fontFamily: 'Open Sans',
    fontSize: 10,
    lineHeight: 1.5,
    fontWeight: 'normal'
  }
});