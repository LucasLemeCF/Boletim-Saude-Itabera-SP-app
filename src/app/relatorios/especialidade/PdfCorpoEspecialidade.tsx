/* eslint-disable jsx-a11y/alt-text */
import { Font, Image, Page, StyleSheet, Text, View } from '@react-pdf/renderer';

export function PdfCorpoEspecialidade({ especialidades, img }) {
  const especialidadesComMeta = [];

  especialidades.map(especialidade => {
    if (especialidade.resultadosMensais[0].metaMensal > 0) {
      especialidadesComMeta.push(especialidade);
    }
  });

  const especialidadesPagina = [];

  for (let i = 0; i < especialidadesComMeta.length; i += 2) {
    especialidadesPagina.push(especialidadesComMeta.slice(i, i + 2));
  }

  return (
    <>
      {especialidadesPagina.map((especialidades, index) => (
        <Pagina key={index} especialidadesPagina={especialidades} img={img}/>
      ))}
    </>
  )
}

function Pagina({especialidadesPagina, img}) {
  return (
    <Page size="A4" style={styles.page}>
      {especialidadesPagina.map(especialidade => (
        <Especialidade especialidade={especialidade} img={img}/>
      ))}
    </Page>
  )
}

function Especialidade({especialidade, img}) {
  return (
    <View style={styles.section}>
      <View style={{ display: "flex",  flexDirection: "row", justifyContent: "space-between", height: "40px" }}>
        <View style={{ width: "50px"}}></View>
        <Text style={{ fontFamily: 'Open Sans', fontSize: 14, fontWeight: 700}}>
          {especialidade.especialidade}
        </Text>
        <Image
          source={"/logo.png"}
          style={{height: "40px", width: "40px", marginRight: "10px"}}
        />
      </View>
      <Image
        source={img}
        style={{ height: "322", width: "552", marginTop: "16px" }}
      />
    </View> 
  )
}

const titulo = (especialidade) => {
  return (
    <div className="text-center font-bold">
       <Text style={{ fontFamily: 'Open Sans', fontSize: 14, fontWeight: 700}}>
          {especialidade.especialidade}
        </Text>
    </div>
  )
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

Font.register({
  family: 'Open Sans',
  fonts: [
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-regular.ttf' },
    { src: 'https://cdn.jsdelivr.net/npm/open-sans-all@0.1.3/fonts/open-sans-700.ttf', fontWeight: 700 }
  ]
})

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});