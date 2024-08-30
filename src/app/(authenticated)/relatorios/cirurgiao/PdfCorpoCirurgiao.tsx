import { Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

export const PdfCorpoCirurgiao = ({ cirurgioes, img }) => {
  const procedimentosPagina = separarProcedimentos(cirurgioes);
  const nomesCirurgioes = separarNomesCirurgioes(cirurgioes);

  return (
    <>
      {procedimentosPagina.map((procedimentos, index) => (
        <Pagina key={index} procedimentosPagina={procedimentos} img={img} indexProcedimento={index} nomesCirurgioes={nomesCirurgioes}/>
      ))}
    </>
  )
}

const Pagina = ({procedimentosPagina, img, indexProcedimento, nomesCirurgioes}) => {
  return (
    <Page size="A4" style={styles.page}>
      {procedimentosPagina.map((procedimento, index) => (
        <Procedimento key={index} procedimento={procedimento} img={img} indexProcedimento={indexProcedimento} index={index} nomesCirurgioes={nomesCirurgioes}/>
      ))}
    </Page>
  )
}

const Procedimento = ({procedimento, img, indexProcedimento, index, nomesCirurgioes}) => {
  const dadosMes = procedimento.resultadosMensais[0];
  const novoIndex = Number(indexProcedimento) * 2 + index + 2;

  return (
    <View style={[styles.containerPagina]}>
      <Titulo nomeProcedimento={procedimento.nome} nomeCirurgiao={nomesCirurgioes[novoIndex-2]}/>
      {descricao(dadosMes)}
      <Image
        source={img[novoIndex]}
        style={{ height: "322px", width: "552px", padding: "16px" }}
      />
    </View> 
  )
}

const Titulo = ({nomeProcedimento, nomeCirurgiao}) => {
  return (
    <Text style={styles.titulo}>
      {nomeProcedimento} - {nomeCirurgiao}
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
            <Text style={styles.textDescription}>{dadosMes.atendimentos} cirurgias realizadas.</Text>
          </View>
        </View>
          <Image
            source={"/logo.png"}
            style={{height: "40px", width: "40px", marginRight: "10px", marginTop: "8px"}}
          />
      </View>
    </View>
  )
}

function separarProcedimentos(cirurgioes) {
  const procedimentosPagina = [];
  let procedimentos = [];

  cirurgioes.map(cirurgiao => {
    cirurgiao.procedimentos.map(procedimento => {
      procedimentos.push(procedimento);
      
      if (procedimentos.length == 2) {
        procedimentosPagina.push(procedimentos)
        procedimentos = [];
      }
    });
  });

  if (procedimentos.length > 0) {
    procedimentosPagina.push(procedimentos)
  }

  return procedimentosPagina;
}

function separarNomesCirurgioes(cirurgioes) {
  const nomesCirurgioes = [];

  cirurgioes.map(cirurgiao => {
    for (let i = 0; i < cirurgiao.procedimentos.length; i++) {
      nomesCirurgioes.push(cirurgiao.nome);
    }
  });

  return nomesCirurgioes;
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