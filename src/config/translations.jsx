// src/config/translations.js
const faqData = {
  en: {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is RREF (Reduced Row Echelon Form)?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RREF is a standardized form of a matrix where: 1) The first non-zero element in each row (leading coefficient) is 1, 2) Each column containing a leading 1 has zeros in all other entries, 3) Any rows of all zeros appear at the bottom, 4) Each leading 1 is to the right of all leading 1's in rows above it.",
      },
    },
    {
      "@type": "Question",
      name: "Why is RREF important in linear algebra?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "RREF is crucial in linear algebra for several reasons: It simplifies solving systems of linear equations, helps in determining matrix rank, aids in finding null space and column space, and assists in matrix inversion and determinant computation.",
      },
    },
    {
      "@type": "Question",
      name: "How is RREF different from REF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "While both are reduced forms, RREF is more standardized. In REF, leading non-zero entries can be any number, while in RREF they must be 1. RREF requires zeros above and below leading 1s, while REF only requires zeros below. RREF gives a unique form for each matrix, while REF may have multiple forms.",
      },
    },
    {
      "@type": "Question",
      name: "Can RREF be used to solve systems of equations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, RREF is particularly useful for solving systems of linear equations. The augmented matrix is converted to RREF, making it easy to read off the solution. Variables corresponding to columns without leading 1s are free variables.",
      },
    },
    {
      "@type": "Question",
      name: "What are the steps to calculate RREF?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The steps are: 1) Find the leftmost non-zero column for a pivot, 2) Make the topmost non-zero entry 1 by dividing its row, 3) Make all other entries in that column 0 using row operations, 4) Repeat for the next column to the right, working only with rows below the current pivot row.",
      },
    },
  ],
},
  de: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Was ist die RREF (Reduzierte Zeilenstufenform)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die RREF ist eine standardisierte Form einer Matrix, bei der: 1) Das erste von null verschiedene Element jeder Zeile (führender Koeffizient) eine 1 ist, 2) Jede Spalte, die eine führende 1 enthält, in allen anderen Einträgen Nullen aufweist, 3) Zeilen mit ausschließlich Nullen unten erscheinen, 4) Jede führende 1 rechts von allen führenden 1en in den darüberliegenden Zeilen liegt.",
        },
      },
      {
        "@type": "Question",
        name: "Warum ist die RREF in der linearen Algebra wichtig?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die RREF ist in der linearen Algebra aus mehreren Gründen entscheidend: Sie vereinfacht das Lösen linearer Gleichungssysteme, hilft bei der Bestimmung des Rangs einer Matrix, unterstützt bei der Bestimmung des Null- und Spaltenraums und hilft bei der Matrixinversion und Determinantenberechnung.",
        },
      },
      {
        "@type": "Question",
        name: "Wie unterscheidet sich die RREF von der REF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Obwohl beide reduzierte Formen sind, ist die RREF standardisierter. In der REF können führende nicht-null Elemente beliebige Zahlen sein, während sie in der RREF 1 sein müssen. Die RREF erfordert Nullen ober- und unterhalb führender 1en, während die REF nur Nullen darunter verlangt. Die RREF liefert eine eindeutige Form für jede Matrix, während die REF mehrere Formen haben kann.",
        },
      },
      {
        "@type": "Question",
        name: "Kann die RREF verwendet werden, um Gleichungssysteme zu lösen?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Ja, die RREF ist besonders nützlich zum Lösen linearer Gleichungssysteme. Die erweiterte Matrix wird in die RREF umgewandelt, was das Ablesen der Lösung erleichtert. Variablen, die Spalten ohne führende 1en entsprechen, sind freie Variablen.",
        },
      },
      {
        "@type": "Question",
        name: "Welche Schritte sind zur Berechnung der RREF erforderlich?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Die Schritte sind: 1) Finde die linkeste von null verschiedene Spalte für ein Pivot-Element, 2) Mache den obersten von null verschiedenen Eintrag durch Teilen der Zeile zu einer 1, 3) Setze alle anderen Einträge in dieser Spalte mit Zeilenoperationen auf 0, 4) Wiederhole dies für die nächste Spalte rechts, wobei nur Zeilen unterhalb der aktuellen Pivot-Zeile berücksichtigt werden.",
        },
      },
    ],
  },
  es: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué es RREF (Forma Escalonada Reducida por Filas)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RREF es una forma estandarizada de una matriz donde: 1) El primer elemento no nulo de cada fila (coeficiente principal) es 1, 2) Cada columna que contiene un 1 principal tiene ceros en todas las demás entradas, 3) Las filas de todos ceros aparecen al final, 4) Cada 1 principal está a la derecha de todos los 1 principales de las filas anteriores.",
        },
      },
      {
        "@type": "Question",
        name: "¿Por qué es importante RREF en álgebra lineal?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RREF es crucial en álgebra lineal por varias razones: simplifica la resolución de sistemas de ecuaciones lineales, ayuda a determinar el rango de una matriz, facilita encontrar el espacio nulo y el espacio columna, y asiste en la inversión de matrices y el cálculo de determinantes.",
        },
      },
      {
        "@type": "Question",
        name: "¿En qué se diferencia RREF de REF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Aunque ambas son formas reducidas, RREF está más estandarizada. En REF, los elementos no nulos principales pueden ser cualquier número, mientras que en RREF deben ser 1. RREF requiere ceros por encima y por debajo de los 1 principales, mientras que REF solo requiere ceros debajo. RREF da una forma única para cada matriz, mientras que REF puede tener múltiples formas.",
        },
      },
      {
        "@type": "Question",
        name: "¿Se puede usar RREF para resolver sistemas de ecuaciones?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí, RREF es particularmente útil para resolver sistemas de ecuaciones lineales. La matriz aumentada se convierte en RREF, lo que facilita leer la solución. Las variables correspondientes a columnas sin 1 principales son variables libres.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cuáles son los pasos para calcular RREF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Los pasos son: 1) Encuentra la columna no nula más a la izquierda para un pivote, 2) Haz que la entrada no nula superior sea 1 dividiendo su fila, 3) Haz que todas las demás entradas en esa columna sean 0 usando operaciones de fila, 4) Repite para la siguiente columna a la derecha, trabajando solo con filas debajo de la fila pivote actual.",
        },
      },
    ],
  },
  fr: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Qu'est-ce que la RREF (forme échelonnée réduite) ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La RREF est une forme normalisée d'une matrice où : 1) Le premier élément non nul de chaque ligne (le coefficient principal) est égal à 1, 2) Chaque colonne contenant un 1 principal a des zéros dans toutes les autres entrées, 3) Les lignes entièrement constituées de zéros apparaissent en bas, 4) Chaque 1 principal est à droite de tous les 1 principaux des lignes au-dessus.",
        },
      },
      {
        "@type": "Question",
        name: "Pourquoi la RREF est-elle importante en algèbre linéaire ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La RREF est cruciale en algèbre linéaire pour plusieurs raisons : elle simplifie la résolution des systèmes d'équations linéaires, aide à déterminer le rang d'une matrice, facilite la recherche de l'espace nul et de l'espace colonne, et assiste dans l'inversion de matrices et le calcul de déterminants.",
        },
      },
      {
        "@type": "Question",
        name: "Quelle est la différence entre RREF et REF ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Bien que les deux soient des formes réduites, la RREF est plus standardisée. Dans la REF, les premiers éléments non nuls peuvent être n'importe quel nombre, tandis que dans la RREF, ils doivent être égaux à 1. La RREF exige des zéros au-dessus et en dessous des 1 principaux, tandis que la REF n'exige des zéros qu'en dessous. La RREF donne une forme unique pour chaque matrice, tandis que la REF peut avoir plusieurs formes.",
        },
      },
      {
        "@type": "Question",
        name: "La RREF peut-elle être utilisée pour résoudre des systèmes d'équations ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, la RREF est particulièrement utile pour résoudre des systèmes d'équations linéaires. La matrice augmentée est convertie en RREF, ce qui facilite la lecture de la solution. Les variables correspondant à des colonnes sans 1 principal sont des variables libres.",
        },
      },
      {
        "@type": "Question",
        name: "Quelles sont les étapes pour calculer la RREF ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Les étapes sont : 1) Trouver la colonne non nulle la plus à gauche pour un pivot, 2) Rendre l'élément non nul supérieur égal à 1 en divisant sa ligne, 3) Rendre toutes les autres entrées de cette colonne égales à 0 à l'aide d'opérations sur les lignes, 4) Répéter pour la colonne suivante à droite, en travaillant uniquement avec les lignes sous la ligne de pivot actuelle.",
        },
      },
    ],
  },
  hi: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "RREF (Reduced Row Echelon Form) क्या है?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RREF एक मानकीकृत मैट्रिक्स फॉर्म है, जिसमें: 1) प्रत्येक पंक्ति में पहला गैर-शून्य तत्व (प्रमुख गुणांक) 1 होता है, 2) प्रत्येक कॉलम जिसमें एक प्रमुख 1 है, उसमें अन्य सभी प्रविष्टियाँ शून्य होती हैं, 3) सभी शून्य वाली पंक्तियाँ नीचे आती हैं, 4) प्रत्येक प्रमुख 1, ऊपर की पंक्तियों में सभी प्रमुख 1 के दाईं ओर होता है।",
        },
      },
      {
        "@type": "Question",
        name: "रैखिक बीजगणित में RREF क्यों महत्वपूर्ण है?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RREF रैखिक बीजगणित में कई कारणों से महत्वपूर्ण है: यह रैखिक समीकरण प्रणालियों को हल करने में सरलता लाता है, मैट्रिक्स रैंक निर्धारित करने में मदद करता है, नल स्पेस और कॉलम स्पेस खोजने में सहायक होता है, और मैट्रिक्स को उलटने और डेटर्मिनेंट की गणना में मदद करता है।",
        },
      },
      {
        "@type": "Question",
        name: "RREF और REF में क्या अंतर है?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "हालांकि दोनों कम किए गए रूप हैं, RREF अधिक मानकीकृत है। REF में अग्रणी गैर-शून्य प्रविष्टियाँ कोई भी संख्या हो सकती हैं, जबकि RREF में वे 1 होनी चाहिए। RREF में अग्रणी 1 के ऊपर और नीचे शून्य होना चाहिए, जबकि REF में केवल नीचे शून्य होना चाहिए। RREF प्रत्येक मैट्रिक्स के लिए एक अद्वितीय रूप देता है, जबकि REF के कई रूप हो सकते हैं।",
        },
      },
      {
        "@type": "Question",
        name: "क्या RREF का उपयोग समीकरण प्रणालियों को हल करने के लिए किया जा सकता है?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "हां, RREF रैखिक समीकरण प्रणालियों को हल करने के लिए विशेष रूप से उपयोगी है। विस्तारित मैट्रिक्स को RREF में बदल दिया जाता है, जिससे समाधान पढ़ना आसान हो जाता है। जिन कॉलम में अग्रणी 1 नहीं है, वे स्वतंत्र चर के अनुरूप होते हैं।",
        },
      },
      {
        "@type": "Question",
        name: "RREF की गणना के लिए कदम क्या हैं?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "कदम हैं: 1) पिवट के लिए बाईं ओर सबसे पहले गैर-शून्य कॉलम खोजें, 2) उसकी पंक्ति को विभाजित करके शीर्ष गैर-शून्य प्रविष्टि को 1 बनाएं, 3) पंक्ति संचालन का उपयोग करके उस कॉलम में अन्य सभी प्रविष्टियों को 0 बनाएं, 4) वर्तमान पिवट पंक्ति के नीचे की पंक्तियों के साथ दाईं ओर के अगले कॉलम के लिए प्रक्रिया दोहराएं।",
        },
      },
    ],
  },
  id: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Apa itu RREF (Reduced Row Echelon Form)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RREF adalah bentuk standar dari sebuah matriks dimana: 1) Elemen pertama yang bukan nol di setiap baris (koefisien utama) adalah 1, 2) Setiap kolom yang mengandung 1 utama memiliki nol di semua entri lainnya, 3) Baris yang semuanya nol muncul di bagian bawah, 4) Setiap 1 utama berada di sebelah kanan semua 1 utama di baris di atasnya."
        }
      },
      {
        "@type": "Question",
        "name": "Mengapa RREF penting dalam aljabar linier?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RREF sangat penting dalam aljabar linier karena beberapa alasan: Ini menyederhanakan pemecahan sistem persamaan linier, membantu dalam menentukan peringkat matriks, membantu dalam menemukan ruang nol dan ruang kolom, serta membantu dalam invers matriks dan perhitungan determinan."
        }
      },
      {
        "@type": "Question",
        "name": "Apa perbedaan antara RREF dan REF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Meskipun keduanya adalah bentuk yang tereduksi, RREF lebih distandarisasi. Dalam REF, entri utama yang bukan nol bisa berupa angka apa saja, sedangkan dalam RREF harus 1. RREF memerlukan nol di atas dan di bawah 1 utama, sementara REF hanya memerlukan nol di bawahnya. RREF memberikan bentuk yang unik untuk setiap matriks, sementara REF bisa memiliki banyak bentuk."
        }
      },
      {
        "@type": "Question",
        "name": "Dapatkah RREF digunakan untuk menyelesaikan sistem persamaan?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ya, RREF sangat berguna untuk menyelesaikan sistem persamaan linier. Matriks yang diperluas diubah menjadi RREF, memudahkan untuk membaca solusi. Variabel yang sesuai dengan kolom tanpa 1 utama adalah variabel bebas."
        }
      },
      {
        "@type": "Question",
        "name": "Apa langkah-langkah untuk menghitung RREF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Langkah-langkahnya adalah: 1) Temukan kolom yang bukan nol paling kiri untuk pivot, 2) Jadikan entri paling atas yang bukan nol 1 dengan membagi barisnya, 3) Jadikan semua entri lainnya dalam kolom itu nol menggunakan operasi baris, 4) Ulangi untuk kolom berikutnya ke kanan, bekerja hanya dengan baris di bawah baris pivot saat ini."
        }
      }
    ]
  },
  it: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Cos'è la forma ridotta di Gauss (RREF)?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RREF è una forma standardizzata di una matrice dove: 1) Il primo elemento diverso da zero in ogni riga (coefficiente principale) è 1, 2) Ogni colonna che contiene un 1 principale ha zeri in tutte le altre voci, 3) Le righe di zeri appaiono in basso, 4) Ogni 1 principale è a destra di tutti gli 1 principali nelle righe sopra di essa."
        }
      },
      {
        "@type": "Question",
        name: "Perché RREF è importante nell'algebra lineare?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RREF è fondamentale nell'algebra lineare per diversi motivi: semplifica la risoluzione di sistemi di equazioni lineari, aiuta a determinare il rango della matrice, facilita il calcolo dello spazio nullo e dello spazio colonna, e supporta l'inversione della matrice e il calcolo del determinante."
        }
      },
      {
        "@type": "Question",
        name: "Come si differenzia RREF da REF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sebbene entrambi siano forme ridotte, RREF è più standardizzato. In REF, gli elementi principali non nulli possono essere qualsiasi numero, mentre in RREF devono essere 1. RREF richiede zeri sopra e sotto gli 1 principali, mentre REF richiede solo zeri sotto. RREF fornisce una forma unica per ogni matrice, mentre REF può avere più forme."
        }
      },
      {
        "@type": "Question",
        name: "Si può usare RREF per risolvere sistemi di equazioni?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sì, RREF è particolarmente utile per risolvere sistemi di equazioni lineari. La matrice aumentata viene convertita in RREF, rendendo facile leggere la soluzione. Le variabili corrispondenti alle colonne senza 1 principali sono variabili libere."
        }
      },
      {
        "@type": "Question",
        name: "Quali sono i passaggi per calcolare RREF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "I passaggi sono: 1) Trova la colonna più a sinistra non nulla per un pivot, 2) Rendi l'elemento non nullo più in alto uguale a 1 dividendo la sua riga, 3) Rendi tutti gli altri elementi in quella colonna uguali a 0 usando operazioni sulle righe, 4) Ripeti per la colonna successiva a destra, lavorando solo con le righe sotto la riga pivot corrente."
        }
      }
    ]
  },
  ja: { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [ 
      { 
        "@type": "Question", 
        name: "RREF（簡約行列階段形式）とは何ですか？", 
        acceptedAnswer: { 
          "@type": "Answer", 
          text: "RREFは行列の標準形式で、次の条件を満たします： 1) 各行の最初の非ゼロ要素（リーディング係数）は1である。 2) リーディング1を含む列の他のすべてのエントリはゼロである。 3) ゼロだけの行は下部に配置される。 4) 各リーディング1は、それより上の行のリーディング1の右側に配置される。"
        } 
      }, 
      { 
        "@type": "Question", 
        name: "RREFは線形代数でなぜ重要なのですか？", 
        acceptedAnswer: { 
          "@type": "Answer", 
          text: "RREFは線形代数で重要です。理由は、線形方程式系の解法を簡略化し、行列の階数を求め、ヌル空間や列空間の計算を助け、行列の逆行列や行列式の計算をサポートするからです。"
        } 
      }, 
      { 
        "@type": "Question", 
        name: "RREFはREFとどう違うのですか？", 
        acceptedAnswer: { 
          "@type": "Answer", 
          text: "両方とも簡約形式ですが、RREFはより標準化されています。REFではリーディング非ゼロ要素が任意の数である可能性がありますが、RREFではそれらは1でなければなりません。RREFではリーディング1の上と下にゼロを配置する必要がありますが、REFでは下のみでよいです。RREFは行列ごとに一意の形式を提供しますが、REFでは複数の形式が存在する可能性があります。"
        } 
      }, 
      { 
        "@type": "Question", 
        name: "RREFは方程式系の解法に使えますか？", 
        acceptedAnswer: { 
          "@type": "Answer", 
          text: "はい、RREFは線形方程式系を解くのに特に有用です。拡大行列をRREFに変換することで、解を簡単に読み取ることができます。リーディング1を持たない列に対応する変数は自由変数となります。"
        } 
      }, 
      { 
        "@type": "Question", 
        name: "RREFを計算する手順は何ですか？", 
        acceptedAnswer: { 
          "@type": "Answer", 
          text: "手順は次の通りです： 1) ピボットのために最も左にある非ゼロ列を見つける。 2) その行の最上部の非ゼロ項を1にするために行を割る。 3) その列の他のすべての項をゼロにするために行の操作を使う。 4) 次の列に対して右に進み、現在のピボット行の下の行でのみ操作を行う。"
        } 
      } 
    ] 
  },
  ko: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "RREF(기약행렬형, Reduced Row Echelon Form)란 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RREF는 행렬의 표준화된 형태로, 다음과 같은 특성을 가집니다: 1) 각 행에서 첫 번째로 0이 아닌 요소(주요 계수)는 1, 2) 주요 1을 포함하는 각 열에는 나머지 항목이 모두 0, 3) 모든 0으로만 구성된 행은 하단에 위치, 4) 각 주요 1은 그 위의 행들의 주요 1보다 오른쪽에 위치."
        }
      },
      {
        "@type": "Question",
        "name": "왜 RREF가 선형대수에서 중요한가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RREF는 선형대수에서 여러 가지 이유로 중요합니다: 선형 방정식 시스템을 푸는 데 도움을 주고, 행렬의 계수를 결정하며, 영공간과 열공간을 찾는 데 도움을 주고, 행렬의 역과 행렬식 계산에도 유용합니다."
        }
      },
      {
        "@type": "Question",
        "name": "RREF는 REF와 어떻게 다른가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RREF와 REF는 모두 축소된 형태지만, RREF가 더 표준화되어 있습니다. REF에서는 주요 비영 항목이 임의의 수일 수 있지만, RREF에서는 반드시 1이어야 합니다. RREF는 주요 1들 위와 아래에 0을 요구하지만, REF는 아래쪽에만 0을 요구합니다. RREF는 각 행렬에 대해 고유한 형태를 제공하며, REF는 여러 형태를 가질 수 있습니다."
        }
      },
      {
        "@type": "Question",
        "name": "RREF를 사용하여 방정식 시스템을 풀 수 있나요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "네, RREF는 선형 방정식 시스템을 풀 때 특히 유용합니다. 증강 행렬을 RREF로 변환하면 쉽게 해를 읽을 수 있습니다. 주요 1이 없는 열에 해당하는 변수는 자유 변수입니다."
        }
      },
      {
        "@type": "Question",
        "name": "RREF를 계산하는 단계는 무엇인가요?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "단계는 다음과 같습니다: 1) 피벗을 위해 왼쪽에서 첫 번째로 0이 아닌 열을 찾습니다, 2) 해당 행을 나누어 가장 위에 있는 비영 항목을 1로 만듭니다, 3) 그 열의 다른 항목들을 행 연산을 사용하여 0으로 만듭니다, 4) 오른쪽의 다음 열에 대해 반복합니다."
        }
      }
    ]
  },
  nl: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Wat is RREF (Gereduceerde Rij Echelon Vorm)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RREF is een gestandaardiseerde vorm van een matrix waarbij: 1) Het eerste niet-nul element in elke rij (leidende coëfficiënt) 1 is, 2) Elke kolom met een leidende 1 heeft nullen in alle andere invoer, 3) Rijen van allemaal nullen onderaan staan, 4) Elke leidende 1 is rechts van alle leidende 1's in de bovenliggende rijen."
        }
      },
      {
        "@type": "Question",
        "name": "Waarom is RREF belangrijk in de lineaire algebra?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "RREF is cruciaal in de lineaire algebra om verschillende redenen: Het vereenvoudigt het oplossen van systemen van lineaire vergelijkingen, helpt bij het bepalen van de matrixrang, ondersteunt bij het vinden van de nulruimte en kolomruimte, en helpt bij matrixinversie en determinantberekeningen."
        }
      },
      {
        "@type": "Question",
        "name": "Hoe verschilt RREF van REF?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Hoewel beide gereduceerde vormen zijn, is RREF gestandaardiseerder. In REF kunnen leidende niet-nul invoeren elk getal zijn, terwijl ze in RREF 1 moeten zijn. RREF vereist nullen boven en onder de leidende 1's, terwijl REF alleen nullen onder de leidende 1's vereist. RREF geeft een unieke vorm voor elke matrix, terwijl REF meerdere vormen kan hebben."
        }
      },
      {
        "@type": "Question",
        "name": "Kan RREF gebruikt worden om systemen van vergelijkingen op te lossen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Ja, RREF is bijzonder nuttig voor het oplossen van systemen van lineaire vergelijkingen. De vergrote matrix wordt omgezet naar RREF, waardoor de oplossing gemakkelijk te lezen is. Variabelen die overeenkomen met kolommen zonder leidende 1's zijn vrije variabelen."
        }
      },
      {
        "@type": "Question",
        "name": "Wat zijn de stappen om RREF te berekenen?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "De stappen zijn: 1) Vind de meest linkse niet-nul kolom voor een pivot, 2) Maak de bovenste niet-nul invoer 1 door de rij te delen, 3) Maak alle andere invoeren in die kolom 0 met rijbewerkingen, 4) Herhaal voor de volgende kolom naar rechts, werk alleen met rijen onder de huidige pivotrij."
        }
      }
    ]
  },
  pl: { 
    "@context": "https://schema.org", 
    "@type": "FAQPage", 
    mainEntity: [
      { 
        "@type": "Question", 
        name: "Co to jest RREF (Zredukowana Forma Wierszy Echelonu)?", 
        acceptedAnswer: { 
          "@type": "Answer", 
          text: "RREF to znormalizowana forma macierzy, w której: 1) Pierwszy niezerowy element w każdym wierszu (współczynnik wiodący) to 1, 2) Każda kolumna zawierająca wiodącą 1 ma zera w pozostałych elementach, 3) Wiersze składające się z samych zer pojawiają się na dole, 4) Każda wiodąca 1 znajduje się na prawo od wszystkich wiodących 1 w wierszach powyżej."
        }
      }, 
      { 
        "@type": "Question", 
        name: "Dlaczego RREF jest ważne w algebrze liniowej?", 
        acceptedAnswer: { 
          "@type": "Answer", 
          text: "RREF jest kluczowe w algebrze liniowej z kilku powodów: Ułatwia rozwiązywanie układów równań liniowych, pomaga w określaniu rangi macierzy, wspomaga w znajdowaniu przestrzeni zerowej i przestrzeni kolumnowej oraz wspomaga obliczanie odwrotności macierzy i wyznacznika."
        }
      },
      { 
        "@type": "Question", 
        name: "Czym RREF różni się od REF?", 
        acceptedAnswer: { 
          "@type": "Answer", 
          text: "Chociaż oba są formami zredukowanymi, RREF jest bardziej znormalizowane. W REF wiodące niezerowe elementy mogą być dowolną liczbą, podczas gdy w RREF muszą wynosić 1. RREF wymaga, aby nad i poniżej wiodącej 1 były zera, podczas gdy w REF wystarczy, że będą one tylko poniżej. RREF daje unikalną formę dla każdej macierzy, podczas gdy REF może mieć wiele form."
        }
      },
      { 
        "@type": "Question", 
        name: "Czy RREF można użyć do rozwiązywania układów równań?", 
        acceptedAnswer: { 
          "@type": "Answer", 
          text: "Tak, RREF jest szczególnie przydatne do rozwiązywania układów równań liniowych. Macierz rozszerzona jest przekształcana do RREF, co ułatwia odczytanie rozwiązania. Zmienne odpowiadające kolumnom bez wiodącej 1 są zmiennymi swobodnymi."
        }
      },
      { 
        "@type": "Question", 
        name: "Jakie są kroki do obliczenia RREF?", 
        acceptedAnswer: { 
          "@type": "Answer", 
          text: "Kroki to: 1) Znajdź lewą najbardziej niezerową kolumnę do użycia jako przekaźnik, 2) Zrób górny niezerowy element równym 1 przez podzielenie jego wiersza, 3) Spraw, by wszystkie inne elementy w tej kolumnie były zerami przy użyciu operacji wierszowych, 4) Powtórz dla kolejnej kolumny po prawej, pracując tylko z wierszami poniżej bieżącego wiersza przekaźnika."
        }
      }
    ]
  }, 
  pt: { 
    "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [ { "@type": "Question", name: "O que é RREF (Forma Echelon Reduzida por Linhas)?", acceptedAnswer: { "@type": "Answer", text: "RREF é uma forma padronizada de uma matriz onde: 1) O primeiro elemento não nulo em cada linha (coeficiente líder) é 1, 2) Cada coluna contendo um 1 líder tem zeros em todas as outras entradas, 3) As linhas de todos os zeros aparecem na parte inferior, 4) Cada 1 líder está à direita de todos os 1 líderes nas linhas acima dele.", }, }, { "@type": "Question", name: "Por que o RREF é importante em álgebra linear?", acceptedAnswer: { "@type": "Answer", text: "O RREF é crucial em álgebra linear por várias razões: ele simplifica a resolução de sistemas de equações lineares, ajuda a determinar o posto da matriz, auxilia na determinação do espaço nulo e do espaço das colunas, e é útil para a inversão de matrizes e o cálculo do determinante.", }, }, { "@type": "Question", name: "Como o RREF é diferente do REF?", acceptedAnswer: { "@type": "Answer", text: "Embora ambos sejam formas reduzidas, o RREF é mais padronizado. No REF, as entradas não nulas líderes podem ser qualquer número, enquanto no RREF elas devem ser 1. O RREF exige zeros acima e abaixo dos 1 líderes, enquanto o REF exige apenas zeros abaixo. O RREF dá uma forma única para cada matriz, enquanto o REF pode ter várias formas.", }, }, { "@type": "Question", name: "O RREF pode ser usado para resolver sistemas de equações?", acceptedAnswer: { "@type": "Answer", text: "Sim, o RREF é particularmente útil para resolver sistemas de equações lineares. A matriz aumentada é convertida para RREF, facilitando a leitura da solução. As variáveis correspondentes a colunas sem 1 líderes são variáveis livres.", }, }, { "@type": "Question", name: "Quais são os passos para calcular o RREF?", acceptedAnswer: { "@type": "Answer", text: "Os passos são: 1) Encontre a coluna não nula mais à esquerda para um pivô, 2) Faça a entrada não nula mais superior ser 1, dividindo sua linha, 3) Torne todas as outras entradas dessa coluna 0 usando operações de linha, 4) Repita para a próxima coluna à direita, trabalhando apenas com as linhas abaixo da linha do pivô atual.", }, }, ], 
    },
  ru: { 
    "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [ { "@type": "Question", name: "Что такое RREF (Снижение строки в каноническую форму)?", acceptedAnswer: { "@type": "Answer", text: "RREF — это стандартизированная форма матрицы, где: 1) Первый ненулевой элемент в каждой строке (ведущий коэффициент) равен 1, 2) Каждый столбец, содержащий ведущую единицу, имеет нули во всех других элементах, 3) Строки, содержащие только нули, располагаются внизу, 4) Каждая ведущая единица располагается справа от всех ведущих единиц в строках выше.", }, }, { "@type": "Question", name: "Почему RREF важен в линейной алгебре?", acceptedAnswer: { "@type": "Answer", text: "RREF имеет важное значение в линейной алгебре по нескольким причинам: он упрощает решение систем линейных уравнений, помогает определять ранг матрицы, находит нулевое пространство и пространство столбцов, а также помогает при инвертировании матриц и вычислении определителей.", }, }, { "@type": "Question", name: "Чем RREF отличается от REF?", acceptedAnswer: { "@type": "Answer", text: "Хотя обе формы являются сокращёнными, RREF более стандартизирован. В REF ведущие ненулевые элементы могут быть любыми числами, в то время как в RREF они должны быть равны 1. RREF требует нулей как выше, так и ниже ведущих единиц, в то время как REF требует только нулей ниже. RREF даёт уникальную форму для каждой матрицы, в то время как REF может иметь несколько форм.", }, }, { "@type": "Question", name: "Можно ли использовать RREF для решения систем уравнений?", acceptedAnswer: { "@type": "Answer", text: "Да, RREF особенно полезен для решения систем линейных уравнений. Дополненная матрица преобразуется в RREF, что позволяет легко прочитать решение. Переменные, соответствующие столбцам без ведущих единиц, являются свободными переменными.", }, }, { "@type": "Question", name: "Каковы шаги для вычисления RREF?", acceptedAnswer: { "@type": "Answer", text: "Шаги следующие: 1) Найдите самый левый ненулевой столбец для поворота, 2) Сделайте самый верхний ненулевой элемент единицей, разделив строку на его значение, 3) Сделайте все остальные элементы в этом столбце нулями с помощью операций с рядами, 4) Повторите для следующего столбца справа, работая только с строками ниже текущей строки поворота.", }, }, ], 
    },
   tr: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "RREF (Azaltılmış Satır Eşkenar Formu) nedir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RREF, bir matrisin standartlaştırılmış bir formudur ve şunları içerir: 1) Her satırdaki ilk sıfır olmayan öğe (öncü katsayı) 1'dir, 2) Öncelikli 1 bulunan her sütunda diğer tüm öğeler sıfırdır, 3) Tüm sıfırdan oluşan satırlar altta yer alır, 4) Her öncü 1, yukarıdaki satırlardaki tüm öncü 1'lerin sağında olmalıdır."
        }
      },
      {
        "@type": "Question",
        name: "RREF, doğrusal cebirle neden önemlidir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RREF, doğrusal cebir açısından birkaç nedenle önemlidir: Doğrusal denklemler sistemlerini çözmeyi basitleştirir, matrisin sırasını belirlemeye yardımcı olur, null alanı ve sütun alanını bulmaya yardımcı olur ve matrisin tersini ve determinantını hesaplamada yardımcı olur."
        }
      },
      {
        "@type": "Question",
        name: "RREF, REF'ten nasıl farklıdır?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Her ikisi de azaltılmış form olsa da, RREF daha standartlaştırılmıştır. REF'te, öncü sıfır olmayan girişler herhangi bir sayı olabilirken, RREF'te 1 olmalıdır. RREF, öncü 1'lerin üstünde ve altında sıfır gerektirirken, REF yalnızca altında sıfır gerektirir. RREF, her matris için benzersiz bir form verirken, REF birden fazla forma sahip olabilir."
        }
      },
      {
        "@type": "Question",
        name: "RREF, denklemler sistemlerini çözmek için kullanılabilir mi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Evet, RREF, doğrusal denklemler sistemlerini çözmek için özellikle kullanışlıdır. Augment edilmiş matris, çözümü okumayı kolaylaştıran RREF'ye dönüştürülür. Öncelikli 1 bulunmayan sütunlara karşılık gelen değişkenler serbest değişkenlerdir."
        }
      },
      {
        "@type": "Question",
        name: "RREF hesaplamak için adımlar nelerdir?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Adımlar şunlardır: 1) Bir pivot için en soldaki sıfır olmayan sütunu bulun, 2) Üstteki sıfır olmayan girişi 1 yapmak için satırını bölün, 3) O sütundaki diğer tüm öğeleri sıfır yapmak için satır işlemleri kullanın, 4) Sonraki sütun için sağa doğru devam edin, yalnızca mevcut pivot satırın altındaki satırlarla çalışın."
        }
      }
    ]
  },
  vi: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "RREF (Hình thức bậc thấp hàng đã rút gọn) là gì?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RREF là một dạng chuẩn của ma trận với các đặc điểm: 1) Phần tử không bằng 0 đầu tiên trong mỗi hàng (hệ số dẫn đầu) là 1, 2) Mỗi cột có 1 hệ số dẫn đầu phải có các giá trị 0 ở các phần tử còn lại, 3) Các hàng chỉ có giá trị 0 phải xuất hiện ở dưới cùng, 4) Mỗi hệ số dẫn đầu 1 phải nằm bên phải của các hệ số dẫn đầu trong các hàng trên nó."
        }
      },
      {
        "@type": "Question",
        name: "Tại sao RREF lại quan trọng trong đại số tuyến tính?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RREF rất quan trọng trong đại số tuyến tính vì nhiều lý do: Nó giúp đơn giản hóa việc giải hệ phương trình tuyến tính, xác định hạng ma trận, giúp tìm không gian null và không gian cột, và hỗ trợ trong việc tính nghịch đảo ma trận và định thức."
        }
      },
      {
        "@type": "Question",
        name: "RREF khác gì so với REF?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Cả RREF và REF đều là dạng rút gọn, nhưng RREF có tính chuẩn hóa cao hơn. Trong REF, các phần tử đầu tiên không bằng 0 có thể là bất kỳ số nào, trong khi trong RREF chúng phải là 1. RREF yêu cầu các giá trị 0 ở cả trên và dưới hệ số dẫn đầu 1, trong khi REF chỉ yêu cầu các giá trị 0 ở dưới. RREF mang lại một dạng duy nhất cho mỗi ma trận, trong khi REF có thể có nhiều dạng khác nhau."
        }
      },
      {
        "@type": "Question",
        name: "RREF có thể được sử dụng để giải hệ phương trình không?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Có, RREF đặc biệt hữu ích trong việc giải hệ phương trình tuyến tính. Ma trận mở rộng sẽ được chuyển sang dạng RREF, giúp dễ dàng đọc ra nghiệm. Các biến tương ứng với các cột không có hệ số dẫn đầu 1 là các biến tự do."
        }
      },
      {
        "@type": "Question",
        name: "Các bước tính RREF là gì?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Các bước là: 1) Tìm cột không phải 0 bên trái nhất để làm điểm tựa, 2) Làm cho phần tử không phải 0 trên cùng trở thành 1 bằng cách chia hàng của nó, 3) Làm cho tất cả các phần tử còn lại trong cột đó bằng 0 bằng cách sử dụng các phép toán hàng, 4) Lặp lại cho cột tiếp theo ở bên phải, chỉ làm việc với các hàng dưới hàng điểm tựa hiện tại."
        }
      }
    ]
  },
  zh: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "什么是RREF（简化行阶梯形式）？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RREF是一种标准化的矩阵形式，其中：1）每行的第一个非零元素（主系数）为1；2）每列包含主1的地方，其余所有条目为零；3）所有零行位于矩阵的底部；4）每个主1的位置都位于上方行的主1的右侧。"
        }
      },
      {
        "@type": "Question",
        name: "为什么RREF在线性代数中很重要？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "RREF在线性代数中至关重要，原因有很多：它简化了解线性方程组，帮助确定矩阵的秩，有助于找到零空间和列空间，并且有助于矩阵的逆运算和行列式计算。"
        }
      },
      {
        "@type": "Question",
        name: "RREF和REF有何不同？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "尽管RREF和REF都是简化形式，但RREF更为标准化。在REF中，主非零条目可以是任何数字，而在RREF中，它们必须是1。RREF要求主1上方和下方的条目为零，而REF仅要求下方为零。RREF为每个矩阵提供唯一的形式，而REF可能有多种形式。"
        }
      },
      {
        "@type": "Question",
        name: "RREF可以用来解线性方程组吗？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "是的，RREF特别有助于解线性方程组。将增广矩阵转换为RREF后，可以轻松读取解。与没有主1的列对应的变量是自由变量。"
        }
      },
      {
        "@type": "Question",
        name: "计算RREF的步骤是什么？",
        acceptedAnswer: {
          "@type": "Answer",
          text: "步骤如下：1）找到最左边的非零列作为枢轴；2）通过除以该行使最顶部的非零条目为1；3）使用行操作将该列中所有其他条目变为0；4）对右边的下一列重复此过程，仅操作当前枢轴行下方的行。"
        }
      }
    ]
  },
}

const generateFaqHtml = (lang) => {
  const faqs = faqData[lang].mainEntity.map((faq) => (
              `<details class="group">
                <summary class="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-surface-light-hover dark:bg-surface-dark">
                  <span class="font-display font-medium">${faq.name}</span>
                  <span class="transition-transform group-open:rotate-180">
                    ↓
                  </span>
                </summary>
                <div class="p-4 text-content-light-dimmed dark:text-content-dark-dimmed">
                  ${faq.acceptedAnswer.text}
                </div>
              </details>`
              )
            )  
    return faqs.join('')
       
}

export const languages = {
  en: {
    code: 'en',
    name: 'English',
    localName: 'English',
    translations: {
      title: 'RREF Calculator - Calculate Reduced Row Echelon Form',
      description: 'Calculate the Reduced Row Echelon Form (RREF) of a matrix with our easy-to-use online calculator. Step-by-step explanations included.',
      keywords: 'RREF, Reduced Row Echelon Form, matrix calculator, linear algebra',
      calculator: {
        title: 'RREF Calculator',
        intro: 'Enter your matrix below to calculate its Reduced Row Echelon Form (RREF).',
        rows: 'Rows',
        columns: 'Columns',
        createMatrix: 'Create Matrix',
        calculate: 'Calculate RREF',
        sizeWarning: 'Large matrices may take longer to compute and might require scrolling. Please be patient.',
        result: 'Result: Reduced Row Echelon Form (RREF)',
        stepByStep: 'Step-by-step Solution',
        finalMatrix: 'Final RREF Matrix',
      },
      about: `<section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          About RREF Calculator
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Welcome to our RREF (Reduced Row Echelon Form) Calculator, a
            powerful tool designed to simplify complex matrix operations. This
            calculator helps students, educators, and professionals quickly
            compute the Reduced Row Echelon Form of any matrix, providing
            step-by-step solutions for better understanding.
          </p>

          <h3>What You Can Do with Our RREF Calculator?</h3>
          <ul>
            <li>Input matrices of various sizes (no fixed upper limit)</li>
            <li>Calculate the RREF of your input matrix</li>
            <li>View detailed, step-by-step solutions</li>
            <li>Understand the process of reaching RREF</li>
            <li>Verify your manual calculations</li>
            <li>Learn about matrix operations and linear algebra concepts</li>
          </ul>

          <h3>How the RREF Calculator Works?</h3>
          <ol>
            <li>
              <strong>Input Your Matrix:</strong> Enter the dimensions and values
              of your matrix using the provided interface.
            </li>
            <li>
              <strong>Initiate Calculation:</strong> Click the "Calculate RREF" button
              to start the process.
            </li>
            <li>
              <strong>Algorithm Execution:</strong> Our calculator applies Gaussian
              elimination with back-substitution to transform the matrix.
            </li>
            <li>
              <strong>Step-by-Step Display:</strong> Each operation is shown with
              a clear explanation and the resulting matrix.
            </li>
            <li>
              <strong>Final Result:</strong> The RREF of your input matrix is displayed,
              along with all intermediate steps.
            </li>
          </ol>
        </div>
      </section>`,
      applications: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Applications of RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            The Reduced Row Echelon Form (RREF) is a powerful tool in linear
            algebra with numerous practical applications across various fields.
          </p>

          <h3>Common Applications</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Solving Systems of Linear Equations
              </h4>
              <p>
                Convert the augmented matrix to RREF to find solutions
                efficiently.
              </p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Determining Matrix Rank
              </h4>
              <p>Count non-zero rows in RREF to find matrix rank.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Finding Matrix Inverses
              </h4>
              <p>Use RREF with augmented identity matrix to find inverses.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Computing Null Space
              </h4>
              <p>Find solutions to homogeneous systems using RREF.</p>
            </div>
          </div>
        </div>
      </section>
      `,
      faqs: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Frequently Asked Questions
        </h2>
        <div class="space-y-4">
          ${generateFaqHtml('en')}
        </div>
      </section>
      `,
      faqData: faqData.en
    }
  },
  de: {
    code: 'de',
    name: 'Deutsch',
    localName: 'Deutsch',
    translations: {
      title: 'RREF-Rechner - Berechnen Sie die reduzierte Zeilenstufenform',
      description: 'Berechnen Sie die reduzierte Zeilenstufenform (RREF) einer Matrix mit unserem benutzerfreundlichen Online-Rechner. Schritt-für-Schritt-Erklärungen inklusive.',
      keywords: 'RREF, reduzierte Zeilenstufenform, Matrixrechner, lineare Algebra',
      calculator: {
        title: 'RREF-Rechner',
        intro: 'Geben Sie Ihre Matrix unten ein, um ihre reduzierte Zeilenstufenform (RREF) zu berechnen.',
        rows: 'Zeilen',
        columns: 'Spalten',
        createMatrix: 'Matrix erstellen',
        calculate: 'RREF berechnen',
        sizeWarning: 'Große Matrizen können länger zur Berechnung benötigen und erfordern möglicherweise ein Scrollen. Bitte haben Sie Geduld.',
        result: 'Ergebnis: Reduzierte Zeilenstufenform (RREF)',
        stepByStep: 'Schritt-für-Schritt-Lösung',
        finalMatrix: 'Endgültige RREF-Matrix',
      },
      about: `<section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Über den RREF-Rechner
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Willkommen bei unserem RREF-Rechner (Reduced Row Echelon Form), einem
            leistungsstarken Tool, das komplexe Matrixoperationen vereinfacht. Dieser
            Rechner hilft Studenten, Lehrern und Fachleuten, die reduzierte Zeilenstufenform
            jeder Matrix schnell zu berechnen und bietet Schritt-für-Schritt-Lösungen für ein besseres Verständnis.
          </p>

          <h3>Was können Sie mit unserem RREF-Rechner tun?</h3>
          <ul>
            <li>Matrizen unterschiedlicher Größe eingeben (keine feste Obergrenze)</li>
            <li>Die reduzierte Zeilenstufenform Ihrer Matrix berechnen</li>
            <li>Detaillierte Schritt-für-Schritt-Lösungen anzeigen</li>
            <li>Den Prozess zur Erreichung der RREF verstehen</li>
            <li>Manuelle Berechnungen überprüfen</li>
            <li>Mehr über Matrixoperationen und lineare Algebra lernen</li>
          </ul>

          <h3>Wie funktioniert der RREF-Rechner?</h3>
          <ol>
            <li>
              <strong>Matrix eingeben:</strong> Geben Sie die Dimensionen und Werte Ihrer Matrix mit der bereitgestellten Oberfläche ein.
            </li>
            <li>
              <strong>Berechnung starten:</strong> Klicken Sie auf die Schaltfläche "RREF berechnen",
              um den Prozess zu starten.
            </li>
            <li>
              <strong>Algorithmusausführung:</strong> Unser Rechner verwendet das Gaußsche Eliminationsverfahren
              mit Rückwärts-Substitution, um die Matrix zu transformieren.
            </li>
            <li>
              <strong>Schritt-für-Schritt-Anzeige:</strong> Jede Operation wird mit einer klaren
              Erklärung und der resultierenden Matrix angezeigt.
            </li>
            <li>
              <strong>Endergebnis:</strong> Die reduzierte Zeilenstufenform Ihrer Eingabematrix wird
              zusammen mit allen Zwischenschritten angezeigt.
            </li>
          </ol>
        </div>
      </section>`,
      applications: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Anwendungen der RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Die reduzierte Zeilenstufenform (RREF) ist ein leistungsstarkes Werkzeug in der
            linearen Algebra mit zahlreichen praktischen Anwendungen in verschiedenen Bereichen.
          </p>

          <h3>Häufige Anwendungen</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Lösung von linearen Gleichungssystemen
              </h4>
              <p>
                Wandeln Sie die erweiterte Matrix in RREF um, um Lösungen effizient zu finden.
              </p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Bestimmung des Matrixrangs
              </h4>
              <p>Zählen Sie die Nicht-Null-Zeilen in der RREF, um den Rang der Matrix zu bestimmen.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Finden von Matrixinversen
              </h4>
              <p>Verwenden Sie RREF mit einer erweiterten Einheitsmatrix, um Inverse zu finden.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Berechnung des Nullraums
              </h4>
              <p>Finden Sie Lösungen für homogene Systeme mit RREF.</p>
            </div>
          </div>
        </div>
      </section>
      `,
      faqs: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Häufig gestellte Fragen
        </h2>
        <div class="space-y-4">
          ${generateFaqHtml('de')}
        </div>
      </section>
      `,
      faqData: faqData.de
    }
  },
  es: {
    code: 'es',
    name: 'Spanish',
    localName: 'Español',
    translations: {
      title: 'Calculadora RREF - Calcula la Forma Escalonada Reducida por Filas',
      description:
        'Calcula la Forma Escalonada Reducida por Filas (RREF) de una matriz con nuestra calculadora en línea fácil de usar. Incluye explicaciones paso a paso.',
      keywords:
        'RREF, Forma Escalonada Reducida por Filas, calculadora de matrices, álgebra lineal',
      calculator: {
        title: 'Calculadora RREF',
        intro: 'Introduce tu matriz a continuación para calcular su Forma Escalonada Reducida por Filas (RREF).',
        rows: 'Filas',
        columns: 'Columnas',
        createMatrix: 'Crear Matriz',
        calculate: 'Calcular RREF',
        sizeWarning:
          'Las matrices grandes pueden tardar más en calcularse y podrían requerir desplazamiento. Por favor, ten paciencia.',
        result: 'Resultado: Forma Escalonada Reducida por Filas (RREF)',
        stepByStep: 'Solución Paso a Paso',
        finalMatrix: 'Matriz RREF Final',
      },
      about: `<section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Acerca de la Calculadora RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Bienvenido a nuestra Calculadora de RREF (Forma Escalonada Reducida por Filas), 
            una herramienta poderosa diseñada para simplificar operaciones matriciales complejas.
            Esta calculadora ayuda a estudiantes, educadores y profesionales a calcular rápidamente 
            la Forma Escalonada Reducida por Filas de cualquier matriz, proporcionando 
            soluciones paso a paso para una mejor comprensión.
          </p>
          <h3>¿Qué Puedes Hacer con Nuestra Calculadora RREF?</h3>
          <ul>
            <li>Introducir matrices de varios tamaños (sin límite superior fijo)</li>
            <li>Calcular el RREF de tu matriz de entrada</li>
            <li>Ver soluciones detalladas paso a paso</li>
            <li>Entender el proceso para llegar a RREF</li>
            <li>Verificar tus cálculos manuales</li>
            <li>Aprender sobre operaciones matriciales y conceptos de álgebra lineal</li>
          </ul>
          <h3>¿Cómo Funciona la Calculadora RREF?</h3>
          <ol>
            <li>
              <strong>Introduce Tu Matriz:</strong> Introduce las dimensiones y valores
              de tu matriz usando la interfaz proporcionada.
            </li>
            <li>
              <strong>Inicia el Cálculo:</strong> Haz clic en el botón "Calcular RREF"
              para iniciar el proceso.
            </li>
            <li>
              <strong>Ejecución del Algoritmo:</strong> Nuestra calculadora aplica eliminación 
              gaussiana con sustitución hacia atrás para transformar la matriz.
            </li>
            <li>
              <strong>Visualización Paso a Paso:</strong> Cada operación se muestra con
              una explicación clara y la matriz resultante.
            </li>
            <li>
              <strong>Resultado Final:</strong> Se muestra el RREF de tu matriz de entrada,
              junto con todos los pasos intermedios.
            </li>
          </ol>
        </div>
      </section>`,
      applications: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Aplicaciones de RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            La Forma Escalonada Reducida por Filas (RREF) es una herramienta poderosa en álgebra 
            lineal con numerosas aplicaciones prácticas en diversos campos.
          </p>
          <h3>Aplicaciones Comunes</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Resolver Sistemas de Ecuaciones Lineales
              </h4>
              <p>
                Convierte la matriz aumentada a RREF para encontrar soluciones
                de manera eficiente.
              </p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Determinar el Rango de una Matriz
              </h4>
              <p>Cuenta las filas no nulas en RREF para hallar el rango de la matriz.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Encontrar Inversas de Matrices
              </h4>
              <p>Usa RREF con una matriz identidad aumentada para encontrar inversas.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Calcular el Espacio Nulo
              </h4>
              <p>Encuentra soluciones para sistemas homogéneos usando RREF.</p>
            </div>
          </div>
        </div>
      </section>
      `,
      faqs: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Preguntas Frecuentes
        </h2>
        <div class="space-y-4">
          ${generateFaqHtml('es')}
        </div>
      </section>
      `,
      faqData: faqData.es,
    },
  },
  fr: {
    code: 'fr',
    name: 'Français',
    localName: 'Français',
    translations: {
      title: 'Calculatrice RREF - Calculer la Forme Échelonnée Réduite',
      description: 'Calculez la forme échelonnée réduite (RREF) d\'une matrice avec notre calculatrice en ligne facile à utiliser. Explications détaillées incluses.',
      keywords: 'RREF, Forme Échelonnée Réduite, calculatrice matricielle, algèbre linéaire',
      calculator: {
        title: 'Calculatrice RREF',
        intro: 'Entrez votre matrice ci-dessous pour calculer sa forme échelonnée réduite (RREF).',
        rows: 'Lignes',
        columns: 'Colonnes',
        createMatrix: 'Créer Matrice',
        calculate: 'Calculer RREF',
        sizeWarning: 'Les grandes matrices peuvent prendre plus de temps à calculer et nécessiter un défilement. Merci de patienter.',
        result: 'Résultat : Forme Échelonnée Réduite (RREF)',
        stepByStep: 'Solution étape par étape',
        finalMatrix: 'Matrice Finale RREF',
      },
      about: `<section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          À propos de la Calculatrice RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Bienvenue sur notre calculatrice RREF (Forme Échelonnée Réduite), un outil
            puissant conçu pour simplifier les opérations matricielles complexes. Cette
            calculatrice aide les étudiants, enseignants et professionnels à calculer
            rapidement la forme échelonnée réduite de toute matrice, avec des solutions
            étape par étape pour une meilleure compréhension.
          </p>


          <h3>Que pouvez-vous faire avec notre calculatrice RREF ?</h3>
          <ul>
            <li>Entrer des matrices de différentes tailles (pas de limite fixe)</li>
            <li>Calculer la RREF de votre matrice</li>
            <li>Voir des solutions détaillées, étape par étape</li>
            <li>Comprendre le processus pour atteindre la RREF</li>
            <li>Vérifier vos calculs manuels</li>
            <li>Apprendre sur les opérations matricielles et les concepts d'algèbre linéaire</li>
          </ul>


          <h3>Comment fonctionne la calculatrice RREF ?</h3>
          <ol>
            <li>
              <strong>Entrez votre matrice :</strong> Saisissez les dimensions et les valeurs
              de votre matrice via l'interface fournie.
            </li>
            <li>
              <strong>Lancez le calcul :</strong> Cliquez sur le bouton "Calculer RREF" pour
              démarrer le processus.
            </li>
            <li>
              <strong>Exécution de l'algorithme :</strong> Notre calculatrice applique
              l'élimination de Gauss avec substitution arrière pour transformer la matrice.
            </li>
            <li>
              <strong>Affichage étape par étape :</strong> Chaque opération est affichée avec
              une explication claire et la matrice résultante.
            </li>
            <li>
              <strong>Résultat final :</strong> La RREF de votre matrice est affichée,
              accompagnée de toutes les étapes intermédiaires.
            </li>
          </ol>
        </div>
      </section>`,
      applications: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Applications de la RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            La forme échelonnée réduite (RREF) est un outil puissant en algèbre
            linéaire avec de nombreuses applications pratiques dans divers domaines.
          </p>


          <h3>Applications Courantes</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Résolution des Systèmes d'Équations Linéaires
              </h4>
              <p>
                Convertissez la matrice augmentée en RREF pour trouver des solutions
                efficacement.
              </p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Détermination du Rang d'une Matrice
              </h4>
              <p>Comptez les lignes non nulles dans la RREF pour trouver le rang.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Recherche d'Inverses de Matrices
              </h4>
              <p>Utilisez la RREF avec une matrice identité augmentée pour trouver les inverses.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Calcul de l'Espace Nul
              </h4>
              <p>Trouvez les solutions aux systèmes homogènes en utilisant la RREF.</p>
            </div>
          </div>
        </div>
      </section>
      `,
      faqs: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Questions Fréquemment Posées
        </h2>
        <div class="space-y-4">
          ${generateFaqHtml('fr')}
        </div>
      </section>
      `,
      faqData: faqData.fr
    }
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    localName: 'हिन्दी',
    translations: {
      title: 'RREF कैलकुलेटर - रिड्यूस्ड रो इशेलॉन फॉर्म की गणना करें',
      description: 'हमारे आसान ऑनलाइन कैलकुलेटर से मैट्रिक्स के रिड्यूस्ड रो इशेलॉन फॉर्म (RREF) की गणना करें। चरण-दर-चरण व्याख्याएं शामिल हैं।',
      keywords: 'RREF, रिड्यूस्ड रो इशेलॉन फॉर्म, मैट्रिक्स कैलकुलेटर, रैखिक बीजगणित',
      calculator: {
        title: 'RREF कैलकुलेटर',
        intro: 'अपना मैट्रिक्स नीचे दर्ज करें और इसका रिड्यूस्ड रो इशेलॉन फॉर्म (RREF) प्राप्त करें।',
        rows: 'पंक्तियाँ',
        columns: 'स्तंभ',
        createMatrix: 'मैट्रिक्स बनाएं',
        calculate: 'RREF की गणना करें',
        sizeWarning: 'बड़े मैट्रिक्स की गणना में अधिक समय लग सकता है और स्क्रॉलिंग की आवश्यकता हो सकती है। कृपया धैर्य रखें।',
        result: 'परिणाम: रिड्यूस्ड रो इशेलॉन फॉर्म (RREF)',
        stepByStep: 'चरण-दर-चरण समाधान',
        finalMatrix: 'अंतिम RREF मैट्रिक्स',
      },
      about: `<section class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
        <h2 class="text-2xl font-display font-bold mb-6">RREF कैलकुलेटर के बारे में</h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>हमारे RREF (रिड्यूस्ड रो इशेलॉन फॉर्म) कैलकुलेटर में आपका स्वागत है, एक शक्तिशाली उपकरण जो जटिल मैट्रिक्स संचालन को सरल बनाता है। यह कैलकुलेटर छात्रों, शिक्षकों और पेशेवरों को किसी भी मैट्रिक्स का RREF जल्दी से गणना करने में मदद करता है, और बेहतर समझ के लिए चरण-दर-चरण समाधान प्रदान करता है।</p>
        </div>
      </section>`,
      applications: `<section class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
        <h2 class="text-2xl font-display font-bold mb-6">RREF के उपयोग</h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>रिड्यूस्ड रो इशेलॉन फॉर्म (RREF) रैखिक बीजगणित में एक शक्तिशाली उपकरण है जिसका कई क्षेत्रों में उपयोग होता है।</p>
        </div>
      </section>`,
      faqs: `<section class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
        <h2 class="text-2xl font-display font-bold mb-6">अक्सर पूछे जाने वाले प्रश्न</h2>
        <div class="space-y-4">${generateFaqHtml('hi')}</div>
      </section>`,
      faqData: faqData.hi,
    },
  },
  id: {
    code: 'id',
    name: 'Bahasa Indonesia',
    localName: 'Bahasa Indonesia',
    translations: {
      title: 'Kalkulator RREF - Hitung Reduced Row Echelon Form',
      description: 'Hitung Reduced Row Echelon Form (RREF) dari sebuah matriks dengan kalkulator online kami yang mudah digunakan. Penjelasan langkah demi langkah disertakan.',
      keywords: 'RREF, Reduced Row Echelon Form, kalkulator matriks, aljabar linier',
      calculator: {
        title: 'Kalkulator RREF',
        intro: 'Masukkan matriks Anda di bawah ini untuk menghitung Reduced Row Echelon Form (RREF).',
        rows: 'Baris',
        columns: 'Kolom',
        createMatrix: 'Buat Matriks',
        calculate: 'Hitung RREF',
        sizeWarning: 'Matriks besar mungkin membutuhkan waktu lebih lama untuk dihitung dan mungkin memerlukan pengguliran. Harap bersabar.',
        result: 'Hasil: Reduced Row Echelon Form (RREF)',
        stepByStep: 'Solusi Langkah-demi-Langkah',
        finalMatrix: 'Matriks RREF Akhir',
      },
      about: `<section class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
        <h2 class="text-2xl font-display font-bold mb-6">
          Tentang Kalkulator RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Selamat datang di Kalkulator RREF (Reduced Row Echelon Form) kami, alat
            yang kuat untuk menyederhanakan operasi matriks yang kompleks. Kalkulator ini
            membantu siswa, pendidik, dan profesional untuk menghitung Reduced Row Echelon Form dari matriks apa pun,
            memberikan solusi langkah-demi-langkah untuk pemahaman yang lebih baik.
          </p>

          <h3>Apa yang Bisa Anda Lakukan dengan Kalkulator RREF Kami?</h3>
          <ul>
            <li>Masukkan matriks dengan berbagai ukuran (tanpa batasan atas)</li>
            <li>Hitung RREF dari matriks input Anda</li>
            <li>Lihat solusi langkah-demi-langkah yang terperinci</li>
            <li>Pahami proses mencapai RREF</li>
            <li>Verifikasi perhitungan manual Anda</li>
            <li>Pelajari tentang operasi matriks dan konsep aljabar linier</li>
          </ul>

          <h3>Bagaimana Kalkulator RREF Bekerja?</h3>
          <ol>
            <li><strong>Masukkan Matriks Anda:</strong> Masukkan dimensi dan nilai dari matriks Anda menggunakan antarmuka yang disediakan.</li>
            <li><strong>Mulai Perhitungan:</strong> Klik tombol "Hitung RREF" untuk memulai proses.</li>
            <li><strong>Eksekusi Algoritma:</strong> Kalkulator kami menerapkan eliminasi Gaussian dengan substitusi balik untuk mengubah matriks.</li>
            <li><strong>Menampilkan Langkah-demi-Langkah:</strong> Setiap operasi ditampilkan dengan penjelasan yang jelas dan matriks hasilnya.</li>
            <li><strong>Hasil Akhir:</strong> RREF dari matriks input Anda ditampilkan, bersama dengan semua langkah perantara.</li>
          </ol>
        </div>
      </section>`,
      applications: `
        <section class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
          <h2 class="text-2xl font-display font-bold mb-6">
            Aplikasi RREF
          </h2>
          <div class="prose dark:prose-invert max-w-none">
            <p>
              Reduced Row Echelon Form (RREF) adalah alat yang kuat dalam aljabar linier dengan banyak aplikasi praktis di berbagai bidang.
            </p>

            <h3>Aplikasi Umum</h3>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-display font-semibold text-lg mb-2">
                  Menyelesaikan Sistem Persamaan Linier
                </h4>
                <p>
                  Ubah matriks yang diperluas ke RREF untuk menemukan solusi dengan efisien.
                </p>
              </div>
              <div>
                <h4 class="font-display font-semibold text-lg mb-2">
                  Menentukan Peringkat Matriks
                </h4>
                <p>Hitung baris non-nol dalam RREF untuk menemukan peringkat matriks.</p>
              </div>
              <div>
                <h4 class="font-display font-semibold text-lg mb-2">
                  Menemukan Invers Matriks
                </h4>
                <p>Gunakan RREF dengan matriks identitas yang diperluas untuk menemukan invers.</p>
              </div>
              <div>
                <h4 class="font-display font-semibold text-lg mb-2">
                  Menghitung Ruang Nol
                </h4>
                <p>Temukan solusi untuk sistem homogen menggunakan RREF.</p>
              </div>
            </div>
          </div>
        </section>
      `,
      faqs: `
        <section class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10">
          <h2 class="text-2xl font-display font-bold mb-6">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div class="space-y-4">
            ${generateFaqHtml('id')}
          </div>
        </section>
      `,
      faqData: faqData.id
    }
  },
  it: {
    code: 'it',
    name: 'Italiano',
    localName: 'Italiano',
    translations: {
      title: 'Calcolatore RREF - Calcola la Forma Ridotta di Gauss',
      description: 'Calcola la Forma Ridotta di Gauss (RREF) di una matrice con il nostro calcolatore online facile da usare. Spiegazioni passo-passo incluse.',
      keywords: 'RREF, Forma Ridotta di Gauss, calcolatore di matrici, algebra lineare',
      calculator: {
        title: 'Calcolatore RREF',
        intro: 'Inserisci la tua matrice qui sotto per calcolare la sua Forma Ridotta di Gauss (RREF).',
        rows: 'Righe',
        columns: 'Colonne',
        createMatrix: 'Crea Matrice',
        calculate: 'Calcola RREF',
        sizeWarning: 'Le matrici grandi potrebbero richiedere più tempo per essere calcolate e potrebbero necessitare di scorrimento. Per favore, sii paziente.',
        result: 'Risultato: Forma Ridotta di Gauss (RREF)',
        stepByStep: 'Soluzione passo-passo',
        finalMatrix: 'Matrice finale RREF',
      },
      about: `<section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Chi siamo Calcolatore RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Benvenuto nel nostro Calcolatore RREF (Forma Ridotta di Gauss), uno
            strumento potente progettato per semplificare le operazioni complesse
            sulle matrici. Questo calcolatore aiuta studenti, educatori e professionisti
            a calcolare rapidamente la Forma Ridotta di Gauss di qualsiasi matrice,
            fornendo soluzioni passo-passo per una migliore comprensione.
          </p>

          <h3>Cosa puoi fare con il nostro calcolatore RREF?</h3>
          <ul>
            <li>Inserire matrici di varie dimensioni (senza limite massimo)</li>
            <li>Calcolare il RREF della tua matrice di input</li>
            <li>Visualizzare soluzioni dettagliate passo-passo</li>
            <li>Comprendere il processo per ottenere il RREF</li>
            <li>Verificare i tuoi calcoli manuali</li>
            <li>Imparare le operazioni sulle matrici e concetti di algebra lineare</li>
          </ul>

          <h3>Come funziona il calcolatore RREF?</h3>
          <ol>
            <li>
              <strong>Inserisci la tua matrice:</strong> Inserisci le dimensioni e i
              valori della tua matrice utilizzando l'interfaccia fornita.
            </li>
            <li>
              <strong>Avvia il calcolo:</strong> Clicca sul pulsante "Calcola RREF" per
              iniziare il processo.
            </li>
            <li>
              <strong>Esecuzione dell'algoritmo:</strong> Il nostro calcolatore applica
              l'eliminazione di Gauss con sostituzione all'indietro per trasformare la matrice.
            </li>
            <li>
              <strong>Visualizzazione passo-passo:</strong> Ogni operazione è mostrata
              con una chiara spiegazione e la matrice risultante.
            </li>
            <li>
              <strong>Risultato finale:</strong> Viene visualizzato il RREF della tua
              matrice di input, insieme a tutti i passaggi intermedi.
            </li>
          </ol>
        </div>
      </section>`,
      applications: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Applicazioni di RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            La Forma Ridotta di Gauss (RREF) è uno strumento potente nell'algebra
            lineare con numerose applicazioni pratiche in vari campi.
          </p>

          <h3>Applicazioni comuni</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Risolvere sistemi di equazioni lineari
              </h4>
              <p>
                Converti la matrice aumentata in RREF per trovare soluzioni
                in modo efficiente.
              </p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Determinare il rango della matrice
              </h4>
              <p>Conta le righe non nulle in RREF per trovare il rango della matrice.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Trovare gli inversi della matrice
              </h4>
              <p>Usa RREF con la matrice identità aumentata per trovare gli inversi.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Calcolare lo spazio nullo
              </h4>
              <p>Trova le soluzioni dei sistemi omogenei utilizzando RREF.</p>
            </div>
          </div>
        </div>
      </section>
      `,
      faqs: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Domande Frequenti
        </h2>
        <div class="space-y-4">
          ${generateFaqHtml('it')}
        </div>
      </section>
      `,
      faqData: faqData.it
    }
  },
  ja: {
    code: 'ja',
    name: '日本語',
    localName: '日本語',
    translations: {
      title: 'RREF計算機 - 簡約行列階段形式を計算',
      description: 'この使いやすいオンライン計算機で行列の簡約行列階段形式（RREF）を計算します。ステップバイステップの説明も含まれています。',
      keywords: 'RREF, 簡約行列階段形式, 行列計算機, 線形代数',
      calculator: {
        title: 'RREF計算機',
        intro: '下に行列を入力して、その簡約行列階段形式（RREF）を計算します。',
        rows: '行',
        columns: '列',
        createMatrix: '行列を作成',
        calculate: 'RREFを計算',
        sizeWarning: '大きな行列は計算に時間がかかる場合があり、スクロールが必要になることがあります。少々お待ちください。',
        result: '結果: 簡約行列階段形式（RREF）',
        stepByStep: 'ステップバイステップの解答',
        finalMatrix: '最終RREF行列',
      },
      about: `<section
       class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
     >
       <h2 class="text-2xl font-display font-bold mb-6">
         RREF計算機について
       </h2>
       <div class="prose dark:prose-invert max-w-none">
         <p>
           RREF（簡約行列階段形式）計算機へようこそ。複雑な行列計算を簡素化するために設計された強力なツールです。この計算機は、学生、教育者、専門家が任意の行列の簡約行列階段形式を迅速に計算し、より良い理解のためにステップバイステップの解答を提供します。
         </p>


         <h3>RREF計算機でできること</h3>
         <ul>
           <li>さまざまなサイズの行列を入力できます（上限なし）</li>
           <li>入力した行列のRREFを計算できます</li>
           <li>詳細なステップバイステップの解答を確認できます</li>
           <li>RREFに到達する過程を理解できます</li>
           <li>手動計算を確認できます</li>
           <li>行列操作や線形代数の概念を学べます</li>
         </ul>


         <h3>RREF計算機の使い方</h3>
         <ol>
           <li>
             <strong>行列を入力:</strong> 提供されたインターフェースを使用して、行列のサイズと値を入力します。
           </li>
           <li>
             <strong>計算を開始:</strong> 「RREFを計算」ボタンをクリックして計算を開始します。
           </li>
           <li>
             <strong>アルゴリズムの実行:</strong> 当計算機はガウス消去法と後退代入を使用して行列を変換します。
           </li>
           <li>
             <strong>ステップバイステップ表示:</strong> 各操作は明確な説明と共に表示され、結果として得られる行列も示されます。
           </li>
           <li>
             <strong>最終結果:</strong> 入力した行列のRREFとすべての中間ステップが表示されます。
           </li>
         </ol>
       </div>
     </section>`,
      applications: `
       <section
       class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
     >
       <h2 class="text-2xl font-display font-bold mb-6">
         RREFの応用
       </h2>
       <div class="prose dark:prose-invert max-w-none">
         <p>
           簡約行列階段形式（RREF）は、線形代数の強力なツールであり、さまざまな分野で多くの実践的な応用があります。
         </p>


         <h3>主な応用例</h3>
         <div class="grid md:grid-cols-2 gap-6">
           <div>
             <h4 class="font-display font-semibold text-lg mb-2">
               線形方程式系の解法
             </h4>
             <p>
               拡大行列をRREFに変換して効率的に解を求めます。
             </p>
           </div>
           <div>
             <h4 class="font-display font-semibold text-lg mb-2">
               行列の階数の算出
             </h4>
             <p>RREFの非ゼロ行を数えることで行列の階数を求めます。</p>
           </div>
           <div>
             <h4 class="font-display font-semibold text-lg mb-2">
               行列の逆行列の計算
             </h4>
             <p>RREFを用いて拡大単位行列と組み合わせて逆行列を求めます。</p>
           </div>
           <div>
             <h4 class="font-display font-semibold text-lg mb-2">
               ヌル空間の計算
             </h4>
             <p>RREFを使用して同次系の解を求めます。</p>
           </div>
         </div>
       </div>
     </section>
     `,
      faqs: `
       <section
       class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
     >
       <h2 class="text-2xl font-display font-bold mb-6">
         よくある質問
       </h2>
       <div class="space-y-4">
         ${generateFaqHtml('ja')}
       </div>
     </section>
     `,
      faqData: faqData.ja
    }
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    localName: '한국어',
    translations: {
      title: 'RREF 계산기 - 기약행렬형 계산',
      description: '우리의 사용하기 쉬운 온라인 계산기를 통해 행렬의 기약행렬형(RREF)을 계산하세요. 단계별 설명도 포함됩니다.',
      keywords: 'RREF, 기약행렬형, 행렬 계산기, 선형대수',
      calculator: {
        title: 'RREF 계산기',
        intro: '아래에 행렬을 입력하여 기약행렬형(RREF)을 계산하세요.',
        rows: '행',
        columns: '열',
        createMatrix: '행렬 생성',
        calculate: 'RREF 계산',
        sizeWarning: '큰 행렬은 계산이 더 오래 걸릴 수 있으며 스크롤이 필요할 수 있습니다. 인내심을 가져주세요.',
        result: '결과: 기약행렬형(RREF)',
        stepByStep: '단계별 풀이',
        finalMatrix: '최종 RREF 행렬',
      },
      about: `<section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          RREF 계산기 소개
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            기약행렬형(RREF) 계산기에 오신 것을 환영합니다. 이 강력한 도구는 복잡한 행렬 연산을 간소화하도록 설계되었습니다. 이 계산기는 학생, 교육자, 전문가들이 빠르게 행렬의 기약행렬형을 계산하고 단계별 해법을 제공하여 더 나은 이해를 돕습니다.
          </p>
          <h3>RREF 계산기로 할 수 있는 일</h3>
          <ul>
            <li>다양한 크기의 행렬 입력 (고정된 상한 없음)</li>
            <li>입력한 행렬의 RREF 계산</li>
            <li>상세한 단계별 풀이 보기</li>
            <li>RREF에 도달하는 과정 이해하기</li>
            <li>수동 계산 검증하기</li>
            <li>행렬 연산과 선형대수 개념 배우기</li>
          </ul>
          <h3>RREF 계산기 사용 방법</h3>
          <ol>
            <li>
              <strong>행렬 입력:</strong> 제공된 인터페이스를 사용하여 행렬의 차원과 값을 입력합니다.
            </li>
            <li>
              <strong>계산 시작:</strong> "RREF 계산" 버튼을 클릭하여 계산을 시작합니다.
            </li>
            <li>
              <strong>알고리즘 실행:</strong> 계산기는 가우시안 소거법과 역대입법을 적용하여 행렬을 변환합니다.
            </li>
            <li>
              <strong>단계별 표시:</strong> 각 연산은 명확한 설명과 함께 결과 행렬을 보여줍니다.
            </li>
            <li>
              <strong>최종 결과:</strong> 입력한 행렬의 RREF와 모든 중간 단계를 표시합니다.
            </li>
          </ol>
        </div>
      </section>`,
      applications: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          RREF의 응용
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            기약행렬형(RREF)은 선형대수에서 강력한 도구로 다양한 분야에서 실용적인 응용이 가능합니다.
          </p>
          <h3>일반적인 응용</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                선형 방정식 시스템 풀이
              </h4>
              <p>
                증강 행렬을 RREF로 변환하여 효율적으로 해를 찾습니다.
              </p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                행렬 계수 구하기
              </h4>
              <p>RREF에서 0이 아닌 행의 개수를 세어 행렬 계수를 구합니다.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                행렬 역 구하기
              </h4>
              <p>증강된 단위 행렬과 함께 RREF를 사용하여 역행렬을 구합니다.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                영공간 계산
              </h4>
              <p>RREF를 사용하여 동차 시스템의 해를 구합니다.</p>
            </div>
          </div>
        </div>
      </section>
      `,
      faqs: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          자주 묻는 질문
        </h2>
        <div class="space-y-4">
          ${generateFaqHtml('ko')}
        </div>
      </section>
      `,
      faqData: faqData.ko
    }
  },
  nl: {
    code: 'nl',
    name: 'Nederlands',
    localName: 'Nederlands',
    translations: {
      title: 'RREF Calculator - Bereken Gereduceerde Rij Echelon Vorm',
      description: 'Bereken de Gereduceerde Rij Echelon Vorm (RREF) van een matrix met onze gebruiksvriendelijke online calculator. Stap-voor-stap uitleg inbegrepen.',
      keywords: 'RREF, Gereduceerde Rij Echelon Vorm, matrix calculator, lineaire algebra',
      calculator: {
        title: 'RREF Calculator',
        intro: 'Voer je matrix hieronder in om de Gereduceerde Rij Echelon Vorm (RREF) te berekenen.',
        rows: 'Rijen',
        columns: 'Kolommen',
        createMatrix: 'Matrix Aanmaken',
        calculate: 'Bereken RREF',
        sizeWarning: 'Grote matrices kunnen langer duren om te berekenen en vereisen mogelijk scrollen. Wees geduldig.',
        result: 'Resultaat: Gereduceerde Rij Echelon Vorm (RREF)',
        stepByStep: 'Stap-voor-stap Oplossing',
        finalMatrix: 'Eind RREF Matrix',
      },
      about: `<section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Over de RREF Calculator
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Welkom bij onze RREF (Gereduceerde Rij Echelon Vorm) Calculator, een
            krachtig hulpmiddel ontworpen om complexe matrixbewerkingen te vereenvoudigen. Deze
            calculator helpt studenten, docenten en professionals om snel de Gereduceerde Rij Echelon Vorm van elke matrix te berekenen, met stap-voor-stap oplossingen voor een beter begrip.
          </p>
          <h3>Wat kun je doen met onze RREF Calculator?</h3>
          <ul>
            <li>Matrixen van verschillende formaten invoeren (geen vaste bovenlimiet)</li>
            <li>De RREF van je ingevoerde matrix berekenen</li>
            <li>Gedetailleerde, stap-voor-stap oplossingen bekijken</li>
            <li>Het proces van het bereiken van RREF begrijpen</li>
            <li>Je handmatige berekeningen verifiëren</li>
            <li>Meer leren over matrixbewerkingen en lineaire algebra</li>
          </ul>
          <h3>Hoe werkt de RREF Calculator?</h3>
          <ol>
            <li>
              <strong>Voer je Matrix in:</strong> Voer de afmetingen en waarden van je matrix in via de verstrekte interface.
            </li>
            <li>
              <strong>Start de Berekening:</strong> Klik op de knop "Bereken RREF" om het proces te starten.
            </li>
            <li>
              <strong>Uitvoering van het Algoritme:</strong> Onze calculator past de Gauss-eliminatie toe met terugsubstitutie om de matrix om te zetten.
            </li>
            <li>
              <strong>Stap-voor-stap Weergave:</strong> Elke bewerking wordt getoond met een duidelijke uitleg en de resulterende matrix.
            </li>
            <li>
              <strong>Finale Resultaat:</strong> De RREF van je ingevoerde matrix wordt weergegeven, samen met alle tussenstappen.
            </li>
          </ol>
        </div>
      </section>`,
      applications: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Toepassingen van RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            De Gereduceerde Rij Echelon Vorm (RREF) is een krachtig hulpmiddel in de lineaire algebra met tal van praktische toepassingen in verschillende vakgebieden.
          </p>
          <h3>Veelvoorkomende Toepassingen</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Het oplossen van systemen van lineaire vergelijkingen
              </h4>
              <p>
                Zet de vergrote matrix om naar RREF om de oplossingen efficiënt te vinden.
              </p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Het bepalen van de matrixrang
              </h4>
              <p>Telt de niet-nul rijen in de RREF om de matrixrang te bepalen.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Het vinden van matrixinverses
              </h4>
              <p>Gebruik RREF met een vergrote identiteit matrix om inverses te vinden.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Het berekenen van de nulruimte
              </h4>
              <p>Vind oplossingen voor homogene systemen met behulp van RREF.</p>
            </div>
          </div>
        </div>
      </section>
      `,
      faqs: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Veelgestelde Vragen
        </h2>
        <div class="space-y-4">
          ${generateFaqHtml('nl')}
        </div>
      </section>
      `,
      faqData: faqData.nl
    }
  },
  pl: {
    code: 'pl',
    name: 'Polski',
    localName: 'Polski',
    translations: {
      title: 'Kalkulator RREF - Oblicz Zredukowaną Formę Wierszy Echelonu',
      description: 'Oblicz Zredukowaną Formę Wierszy Echelonu (RREF) macierzy za pomocą naszego łatwego w użyciu kalkulatora online. Zawiera wyjaśnienia krok po kroku.',
      keywords: 'RREF, Zredukowana Forma Wierszy Echelonu, kalkulator macierzy, algebra liniowa',
      calculator: {
        title: 'Kalkulator RREF',
        intro: 'Wprowadź swoją macierz poniżej, aby obliczyć jej Zredukowaną Formę Wierszy Echelonu (RREF).',
        rows: 'Wiersze',
        columns: 'Kolumny',
        createMatrix: 'Utwórz Macierz',
        calculate: 'Oblicz RREF',
        sizeWarning: 'Duże macierze mogą wymagać więcej czasu na obliczenie i mogą wymagać przewijania. Prosimy o cierpliwość.',
        result: 'Wynik: Zredukowana Forma Wierszy Echelonu (RREF)',
        stepByStep: 'Rozwiązanie Krok po Kroku',
        finalMatrix: 'Końcowa Macierz RREF',
      },
      about: `<section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          O Kalkulatorze RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Witaj w naszym Kalkulatorze RREF (Zredukowanej Formy Wierszy Echelonu), potężnym narzędziu zaprojektowanym w celu uproszczenia skomplikowanych operacji na macierzach. Ten kalkulator pomaga studentom, nauczycielom i profesjonalistom szybko obliczyć Zredukowaną Formę Wierszy Echelonu dowolnej macierzy, zapewniając rozwiązania krok po kroku dla lepszego zrozumienia.
          </p>
          <h3>Co Możesz Zrobić z Naszym Kalkulatorem RREF?</h3>
          <ul>
            <li>Wprowadzać macierze o różnych rozmiarach (brak górnej granicy)</li>
            <li>Obliczyć RREF wprowadzonej macierzy</li>
            <li>Wyświetlić szczegółowe rozwiązania krok po kroku</li>
            <li>Zrozumieć proces dochodzenia do RREF</li>
            <li>Weryfikować własne obliczenia ręczne</li>
            <li>Dowiedzieć się więcej o operacjach na macierzach i pojęciach algebry liniowej</li>
          </ul>
          <h3>Jak Działa Kalkulator RREF?</h3>
          <ol>
            <li>
              <strong>Wprowadź swoją macierz:</strong> Wprowadź wymiary i wartości swojej macierzy za pomocą dostępnego interfejsu.
            </li>
            <li>
              <strong>Rozpocznij obliczenia:</strong> Kliknij przycisk "Oblicz RREF", aby rozpocząć proces.
            </li>
            <li>
              <strong>Wykonanie algorytmu:</strong> Nasz kalkulator stosuje eliminację Gaussa z podstawowym substytucjonowaniem do przekształcenia macierzy.
            </li>
            <li>
              <strong>Wyświetlenie krok po kroku:</strong> Każda operacja jest pokazywana z wyjaśnieniem i wynikową macierzą.
            </li>
            <li>
              <strong>Ostateczny wynik:</strong> Zredukowana Forma Wierszy Echelonu Twojej macierzy jest wyświetlana, wraz z wszystkimi krokami pośrednimi.
            </li>
          </ol>
        </div>
      </section>`,
      applications: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Zastosowania RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Zredukowana Forma Wierszy Echelonu (RREF) to potężne narzędzie w algebrze liniowej, które ma liczne praktyczne zastosowania w różnych dziedzinach.
          </p>
          <h3>Typowe Zastosowania</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Rozwiązywanie Układów Równań Liniowych
              </h4>
              <p>
                Przekształć macierz rozszerzoną do RREF, aby znaleźć rozwiązania w sposób efektywny.
              </p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Określanie Rangi Macierzy
              </h4>
              <p>Policz niezerowe wiersze w RREF, aby znaleźć rangę macierzy.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Znajdowanie Odwrotności Macierzy
              </h4>
              <p>Użyj RREF z macierzą jednostkową rozszerzoną, aby znaleźć odwrotności.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Obliczanie Przestrzeni Zerowej
              </h4>
              <p>Znajdź rozwiązania układów jednorodnych za pomocą RREF.</p>
            </div>
          </div>
        </div>
      </section>
      `,
      faqs: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Najczęściej Zadawane Pytania
        </h2>
        <div class="space-y-4">
          ${generateFaqHtml('pl')}
        </div>
      </section>
      `,
      faqData: faqData.pl
    }
  },
  pt: {
   code: 'pt',
   name: 'Português',
   localName: 'Português',
   translations: {
     title: 'Calculadora RREF - Calcule a Forma Echelon Reduzida por Linhas',
     description: 'Calcule a Forma Echelon Reduzida por Linhas (RREF) de uma matriz com nossa calculadora online fácil de usar. Explicações passo a passo incluídas.',
     keywords: 'RREF, Forma Echelon Reduzida por Linhas, calculadora de matrizes, álgebra linear',
     calculator: {
       title: 'Calculadora RREF',
       intro: 'Digite sua matriz abaixo para calcular sua Forma Echelon Reduzida por Linhas (RREF).',
       rows: 'Linhas',
       columns: 'Colunas',
       createMatrix: 'Criar Matriz',
       calculate: 'Calcular RREF',
       sizeWarning: 'Matrizes grandes podem levar mais tempo para serem calculadas e podem exigir rolagem. Por favor, seja paciente.',
       result: 'Resultado: Forma Echelon Reduzida por Linhas (RREF)',
       stepByStep: 'Solução passo a passo',
       finalMatrix: 'Matriz Final RREF',
     },
     about: `<section
       class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
     >
       <h2 class="text-2xl font-display font-bold mb-6">
         Sobre a Calculadora RREF
       </h2>
       <div class="prose dark:prose-invert max-w-none">
         <p>
           Bem-vindo à nossa Calculadora RREF (Forma Echelon Reduzida por Linhas), uma
           ferramenta poderosa projetada para simplificar operações complexas de matrizes. Esta
           calculadora ajuda estudantes, educadores e profissionais a calcular rapidamente
           a Forma Echelon Reduzida por Linhas de qualquer matriz, fornecendo
           soluções passo a passo para melhor compreensão.
         </p>

         <h3>O que você pode fazer com nossa Calculadora RREF?</h3>
         <ul>
           <li>Inserir matrizes de vários tamanhos (sem limite superior fixo)</li>
           <li>Calcular o RREF da matriz inserida</li>
           <li>Ver soluções detalhadas e passo a passo</li>
           <li>Entender o processo para chegar ao RREF</li>
           <li>Verificar seus cálculos manuais</li>
           <li>Aprender sobre operações de matrizes e conceitos de álgebra linear</li>
         </ul>

         <h3>Como a Calculadora RREF Funciona?</h3>
         <ol>
           <li>
             <strong>Insira sua Matriz:</strong> Digite as dimensões e valores
             de sua matriz usando a interface fornecida.
           </li>
           <li>
             <strong>Inicie o Cálculo:</strong> Clique no botão "Calcular RREF"
             para iniciar o processo.
           </li>
           <li>
             <strong>Execução do Algoritmo:</strong> Nossa calculadora aplica
             eliminação de Gauss com substituição reversa para transformar a matriz.
           </li>
           <li>
             <strong>Exibição Passo a Passo:</strong> Cada operação é exibida com
             uma explicação clara e a matriz resultante.
           </li>
           <li>
             <strong>Resultado Final:</strong> O RREF da sua matriz inserida é exibido,
             junto com todos os passos intermediários.
           </li>
         </ol>
       </div>
     </section>`,
     applications: `
       <section
       class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
     >
       <h2 class="text-2xl font-display font-bold mb-6">
         Aplicações do RREF
       </h2>
       <div class="prose dark:prose-invert max-w-none">
         <p>
           A Forma Echelon Reduzida por Linhas (RREF) é uma ferramenta poderosa em álgebra
           linear com inúmeras aplicações práticas em várias áreas.
         </p>

         <h3>Aplicações Comuns</h3>
         <div class="grid md:grid-cols-2 gap-6">
           <div>
             <h4 class="font-display font-semibold text-lg mb-2">
               Resolução de Sistemas de Equações Lineares
             </h4>
             <p>
               Converta a matriz aumentada para RREF para encontrar soluções
               de forma eficiente.
             </p>
           </div>
           <div>
             <h4 class="font-display font-semibold text-lg mb-2">
               Determinação do Posto da Matriz
             </h4>
             <p>Conte as linhas não nulas no RREF para encontrar o posto da matriz.</p>
           </div>
           <div>
             <h4 class="font-display font-semibold text-lg mb-2">
               Encontrando Inversas de Matrizes
             </h4>
             <p>Use o RREF com a matriz identidade aumentada para encontrar inversas.</p>
           </div>
           <div>
             <h4 class="font-display font-semibold text-lg mb-2">
               Cálculo do Espaço Nulo
             </h4>
             <p>Encontre soluções para sistemas homogêneos usando RREF.</p>
           </div>
         </div>
       </div>
     </section>
     `,
     faqs: `
       <section
       class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
     >
       <h2 class="text-2xl font-display font-bold mb-6">
         Perguntas Frequentes
       </h2>
       <div class="space-y-4">
         ${generateFaqHtml('pt')}
       </div>
     </section>
     `,
     faqData: faqData.pt
   }
 },
 ru: {
   code: 'ru',
   name: 'Русский',
   localName: 'Русский',
   translations: {
     title: 'Калькулятор RREF - Рассчитать сокращённую строковую каноническую форму',
     description: 'Рассчитайте сокращённую строковую каноническую форму (RREF) матрицы с помощью нашего простого онлайн-калькулятора. Включены пошаговые объяснения.',
     keywords: 'RREF, сокращённая строковая каноническая форма, калькулятор матриц, линейная алгебра',
     calculator: {
       title: 'Калькулятор RREF',
       intro: 'Введите свою матрицу ниже для расчёта её сокращённой строковой канонической формы (RREF).',
       rows: 'Строки',
       columns: 'Столбцы',
       createMatrix: 'Создать матрицу',
       calculate: 'Рассчитать RREF',
       sizeWarning: 'Для больших матриц расчёт может занять больше времени и потребовать прокрутки. Пожалуйста, будьте терпеливы.',
       result: 'Результат: Сокращённая строковая каноническая форма (RREF)',
       stepByStep: 'Пошаговое решение',
       finalMatrix: 'Итоговая матрица RREF',
     },
     about: `<section
       class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
     >
       <h2 class="text-2xl font-display font-bold mb-6">
         О калькуляторе RREF
       </h2>
       <div class="prose dark:prose-invert max-w-none">
         <p>
           Добро пожаловать в наш калькулятор RREF (Сокращённая строковая каноническая форма), мощный инструмент, предназначенный для упрощения сложных операций с матрицами. Этот калькулятор помогает студентам, преподавателям и профессионалам быстро вычислять сокращённую строковую каноническую форму любой матрицы, предоставляя пошаговые решения для лучшего понимания.
         </p>


         <h3>Что можно сделать с нашим калькулятором RREF?</h3>
         <ul>
           <li>Вводить матрицы различных размеров (без фиксированного верхнего предела)</li>
           <li>Вычислять RREF для вашей матрицы</li>
           <li>Просматривать подробные пошаговые решения</li>
           <li>Понимать процесс получения RREF</li>
           <li>Проверять свои ручные вычисления</li>
           <li>Изучать операции с матрицами и концепции линейной алгебры</li>
         </ul>


         <h3>Как работает калькулятор RREF?</h3>
         <ol>
           <li>
             <strong>Ввести вашу матрицу:</strong> Введите размеры и значения вашей матрицы с помощью предоставленного интерфейса.
           </li>
           <li>
             <strong>Запуск расчёта:</strong> Нажмите кнопку "Рассчитать RREF", чтобы начать процесс.
           </li>
           <li>
             <strong>Выполнение алгоритма:</strong> Наш калькулятор применяет метод Гаусса с обратной подстановкой для преобразования матрицы.
           </li>
           <li>
             <strong>Пошаговый вывод:</strong> Каждая операция отображается с чётким объяснением и полученной матрицей.
           </li>
           <li>
             <strong>Итоговый результат:</strong> Отображается RREF для вашей матрицы, а также все промежуточные шаги.
           </li>
         </ol>
       </div>
     </section>`,
     applications: `
       <section
       class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
     >
       <h2 class="text-2xl font-display font-bold mb-6">
         Применения RREF
       </h2>
       <div class="prose dark:prose-invert max-w-none">
         <p>
           Сокращённая строковая каноническая форма (RREF) — мощный инструмент в линейной алгебре, имеющий многочисленные практические применения в различных областях.
         </p>


         <h3>Основные применения</h3>
         <div class="grid md:grid-cols-2 gap-6">
           <div>
             <h4 class="font-display font-semibold text-lg mb-2">
               Решение систем линейных уравнений
             </h4>
             <p>
               Преобразование дополненной матрицы в RREF для эффективного нахождения решений.
             </p>
           </div>
           <div>
             <h4 class="font-display font-semibold text-lg mb-2">
               Определение ранга матрицы
             </h4>
             <p>Подсчёт ненулевых строк в RREF для нахождения ранга матрицы.</p>
           </div>
           <div>
             <h4 class="font-display font-semibold text-lg mb-2">
               Нахождение обратных матриц
             </h4>
             <p>Использование RREF с дополненной единичной матрицей для нахождения обратных матриц.</p>
           </div>
           <div>
             <h4 class="font-display font-semibold text-lg mb-2">
               Вычисление нулевого пространства
             </h4>
             <p>Нахождение решений гомогенных систем с использованием RREF.</p>
           </div>
         </div>
       </div>
     </section>
     `,
     faqs: `
       <section
       class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
     >
       <h2 class="text-2xl font-display font-bold mb-6">
         Часто задаваемые вопросы
       </h2>
       <div class="space-y-4">
         ${generateFaqHtml('ru')}
       </div>
     </section>
     `,
     faqData: faqData.ru
   }
 },
 tr: {
    code: 'tr',
    name: 'Türkçe',
    localName: 'Türkçe',
    translations: {
      title: 'RREF Hesaplayıcı - Azaltılmış Satır Eşkenar Formu Hesapla',
      description: 'Kolay kullanımlı çevrimiçi hesaplayıcımızla bir matrisin Azaltılmış Satır Eşkenar Formu (RREF) hesaplayın. Adım adım açıklamalar dahildir.',
      keywords: 'RREF, Azaltılmış Satır Eşkenar Formu, matris hesaplayıcı, doğrusal cebir',
      calculator: {
        title: 'RREF Hesaplayıcı',
        intro: 'Aşağıya matrisinizi girin ve Azaltılmış Satır Eşkenar Formunu (RREF) hesaplayın.',
        rows: 'Satırlar',
        columns: 'Sütunlar',
        createMatrix: 'Matris Oluştur',
        calculate: 'RREF Hesapla',
        sizeWarning: 'Büyük matrisler hesaplanması daha uzun sürebilir ve kaydırma yapmayı gerektirebilir. Lütfen sabırlı olun.',
        result: 'Sonuç: Azaltılmış Satır Eşkenar Formu (RREF)',
        stepByStep: 'Adım adım Çözüm',
        finalMatrix: 'Son RREF Matrisi',
      },
      about: `<section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          RREF Hesaplayıcı Hakkında
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            RREF (Azaltılmış Satır Eşkenar Formu) Hesaplayıcımıza hoş geldiniz, karmaşık matris işlemlerini basitleştirmeye yönelik güçlü bir araçtır. Bu hesaplayıcı, öğrencilerin, eğitimcilerin ve profesyonellerin herhangi bir matrisin Azaltılmış Satır Eşkenar Formunu hızla hesaplamalarına yardımcı olur ve adım adım çözümler sunar.
          </p>

          <h3>RREF Hesaplayıcımızla Neler Yapabilirsiniz?</h3>
          <ul>
            <li>Çeşitli boyutlarda matrisler girin (belirli bir üst sınır yoktur)</li>
            <li>Girdiğiniz matrisin RREF'sini hesaplayın</li>
            <li>Detaylı, adım adım çözümler görün</li>
            <li>RREF'ye ulaşma sürecini anlayın</li>
            <li>Manuel hesaplamalarınızı doğrulayın</li>
            <li>Matris işlemleri ve doğrusal cebir kavramları hakkında bilgi edinin</li>
          </ul>

          <h3>RREF Hesaplayıcısı Nasıl Çalışır?</h3>
          <ol>
            <li>
              <strong>Matrisinizi Girin:</strong> Sağlanan arayüzü kullanarak matrisinizin boyutlarını ve değerlerini girin.
            </li>
            <li>
              <strong>Hesaplamayı Başlatın:</strong> "RREF Hesapla" düğmesine tıklayın.
            </li>
            <li>
              <strong>Algoritma Uygulaması:</strong> Hesaplayıcımız, matrisi dönüştürmek için Gauss eliminasyonunu arka ikame ile uygular.
            </li>
            <li>
              <strong>Adım Adım Gösterim:</strong> Her işlem net bir açıklama ve sonuçta elde edilen matrisle gösterilir.
            </li>
            <li>
              <strong>Sonuç:</strong> Girdiğiniz matrisin RREF'si, tüm ara adımlar ile birlikte görüntülenir.
            </li>
          </ol>
        </div>
      </section>`,
      applications: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          RREF Uygulamaları
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Azaltılmış Satır Eşkenar Formu (RREF), doğrusal cebir alanında güçlü bir araç olup çeşitli alanlarda pratik uygulamalara sahiptir.
          </p>

          <h3>Yaygın Uygulamalar</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Doğrusal Denklemler Sistemlerini Çözme
              </h4>
              <p>
                Augment edilmiş matrisi RREF'ye dönüştürerek çözümleri verimli bir şekilde bulun.
              </p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Matrisin Sırasını Belirleme
              </h4>
              <p>RREF'deki sıfır olmayan satırları sayarak matrisin sırasını bulun.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Matrisin Tersini Bulma
              </h4>
              <p>RREF'yi augment edilmiş kimlik matrisiyle kullanarak tersleri bulun.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Null Alanını Hesaplama
              </h4>
              <p>RREF kullanarak homojen sistemlerin çözümlerini bulun.</p>
            </div>
          </div>
        </div>
      </section>
      `,
      faqs: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Sıkça Sorulan Sorular
        </h2>
        <div class="space-y-4">
          ${generateFaqHtml('tr')}
        </div>
      </section>
      `,
      faqData: faqData.tr
    }
  },
  vi: {
    code: 'vi',
    name: 'Tiếng Việt',
    localName: 'Tiếng Việt',
    translations: {
      title: 'Máy Tính RREF - Tính Hình Thức Bậc Thấp Hàng Đã Rút Gọn',
      description: 'Tính Hình Thức Bậc Thấp Hàng Đã Rút Gọn (RREF) của một ma trận với máy tính trực tuyến dễ sử dụng của chúng tôi. Bao gồm các giải thích chi tiết từng bước.',
      keywords: 'RREF, Hình thức bậc thấp hàng đã rút gọn, máy tính ma trận, đại số tuyến tính',
      calculator: {
        title: 'Máy Tính RREF',
        intro: 'Nhập ma trận của bạn dưới đây để tính Hình Thức Bậc Thấp Hàng Đã Rút Gọn (RREF).',
        rows: 'Hàng',
        columns: 'Cột',
        createMatrix: 'Tạo Ma Trận',
        calculate: 'Tính RREF',
        sizeWarning: 'Ma trận lớn có thể mất nhiều thời gian để tính toán và có thể cần cuộn trang. Vui lòng kiên nhẫn.',
        result: 'Kết quả: Hình Thức Bậc Thấp Hàng Đã Rút Gọn (RREF)',
        stepByStep: 'Giải pháp Từng Bước',
        finalMatrix: 'Ma Trận RREF Cuối Cùng',
      },
      about: `<section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Giới Thiệu Máy Tính RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Chào mừng bạn đến với Máy Tính RREF (Hình Thức Bậc Thấp Hàng Đã Rút Gọn),
            một công cụ mạnh mẽ được thiết kế để đơn giản hóa các phép toán ma trận phức tạp. Máy tính này giúp sinh viên, giảng viên và các chuyên gia tính toán nhanh chóng Hình Thức Bậc Thấp Hàng Đã Rút Gọn của bất kỳ ma trận nào, cung cấp giải pháp chi tiết từng bước để dễ dàng hiểu hơn.
          </p>
  
          <h3>Bạn Có Thể Làm Gì Với Máy Tính RREF?</h3>
          <ul>
            <li>Nhập ma trận với các kích thước khác nhau (không có giới hạn kích thước)</li>
            <li>Tính toán RREF của ma trận nhập vào</li>
            <li>Xem giải pháp chi tiết từng bước</li>
            <li>Hiểu quy trình để đạt được RREF</li>
            <li>Xác minh các phép tính thủ công của bạn</li>
            <li>Học về các phép toán ma trận và các khái niệm trong đại số tuyến tính</li>
          </ul>
  
          <h3>Máy Tính RREF Hoạt Động Như Thế Nào?</h3>
          <ol>
            <li>
              <strong>Nhập Ma Trận:</strong> Nhập kích thước và giá trị của ma trận qua giao diện có sẵn.
            </li>
            <li>
              <strong>Bắt Đầu Tính Toán:</strong> Nhấn nút "Tính RREF" để bắt đầu quá trình.
            </li>
            <li>
              <strong>Thực Thi Thuật Toán:</strong> Máy tính của chúng tôi áp dụng phép khử Gauss với thay thế ngược để biến đổi ma trận.
            </li>
            <li>
              <strong>Hiển Thị Từng Bước:</strong> Mỗi phép toán được hiển thị với giải thích rõ ràng và ma trận kết quả.
            </li>
            <li>
              <strong>Kết Quả Cuối Cùng:</strong> RREF của ma trận nhập vào được hiển thị, kèm theo tất cả các bước trung gian.
            </li>
          </ol>
        </div>
      </section>`,
      applications: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Ứng Dụng Của RREF
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            Hình Thức Bậc Thấp Hàng Đã Rút Gọn (RREF) là một công cụ mạnh mẽ trong đại số tuyến tính với nhiều ứng dụng thực tế trong nhiều lĩnh vực khác nhau.
          </p>
  
          <h3>Ứng Dụng Thông Dụng</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Giải Hệ Phương Trình Tuyến Tính
              </h4>
              <p>
                Chuyển ma trận mở rộng thành RREF để tìm nghiệm một cách hiệu quả.
              </p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Xác Định Hạng Ma Trận
              </h4>
              <p>Đếm số hàng không phải 0 trong RREF để tìm hạng ma trận.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Tìm Nghịch Đảo Ma Trận
              </h4>
              <p>Sử dụng RREF với ma trận đơn vị mở rộng để tìm nghịch đảo.</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                Tính Không Gian Null
              </h4>
              <p>Tìm nghiệm của hệ phương trình đồng nhất bằng RREF.</p>
            </div>
          </div>
        </div>
      </section>
      `,
      faqs: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          Các Câu Hỏi Thường Gặp
        </h2>
        <div class="space-y-4">
          ${generateFaqHtml('vi')}
        </div>
      </section>
      `,
      faqData: faqData.vi
    }
  },
  zh: {
    code: 'zh',
    name: '中文',
    localName: '中文',
    translations: {
      title: 'RREF 计算器 - 计算简化行阶梯形式',
      description: '使用我们的在线计算器计算矩阵的简化行阶梯形式（RREF）。包含逐步说明。',
      keywords: 'RREF, 简化行阶梯形式, 矩阵计算器, 线性代数',
      calculator: {
        title: 'RREF 计算器',
        intro: '在下方输入您的矩阵以计算其简化行阶梯形式（RREF）。',
        rows: '行',
        columns: '列',
        createMatrix: '创建矩阵',
        calculate: '计算 RREF',
        sizeWarning: '大型矩阵可能需要更长时间来计算，并可能需要滚动。请耐心等待。',
        result: '结果：简化行阶梯形式（RREF）',
        stepByStep: '逐步解决方案',
        finalMatrix: '最终RREF矩阵',
      },
      about: `<section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          关于RREF计算器
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            欢迎使用我们的RREF（简化行阶梯形式）计算器，这是一款旨在简化复杂矩阵运算的强大工具。该计算器帮助学生、教育工作者和专业人士快速计算任何矩阵的简化行阶梯形式，并提供逐步解决方案以便更好地理解。
          </p>


          <h3>使用RREF计算器可以做什么？</h3>
          <ul>
            <li>输入不同大小的矩阵（没有固定的上限）</li>
            <li>计算输入矩阵的RREF</li>
            <li>查看详细的逐步解决方案</li>
            <li>理解达到RREF的过程</li>
            <li>验证您的手动计算</li>
            <li>了解矩阵运算和线性代数概念</li>
          </ul>


          <h3>RREF计算器如何工作？</h3>
          <ol>
            <li>
              <strong>输入矩阵：</strong>使用提供的界面输入矩阵的维度和值。
            </li>
            <li>
              <strong>开始计算：</strong>点击“计算RREF”按钮开始处理。
            </li>
            <li>
              <strong>算法执行：</strong>我们的计算器应用高斯消元法和回代法转换矩阵。
            </li>
            <li>
              <strong>逐步显示：</strong>每个操作都有清晰的解释和结果矩阵。
            </li>
            <li>
              <strong>最终结果：</strong>显示输入矩阵的RREF，并附上所有中间步骤。
            </li>
          </ol>
        </div>
      </section>`,
      applications: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          RREF的应用
        </h2>
        <div class="prose dark:prose-invert max-w-none">
          <p>
            简化行阶梯形式（RREF）是线性代数中的强大工具，在各个领域都有广泛的实际应用。
          </p>


          <h3>常见应用</h3>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                解线性方程组
              </h4>
              <p>
                将增广矩阵转换为RREF，快速找到解。
              </p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                矩阵秩的确定
              </h4>
              <p>通过RREF中的非零行来确定矩阵秩。</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                寻找矩阵逆
              </h4>
              <p>使用带增广单位矩阵的RREF来计算矩阵的逆。</p>
            </div>
            <div>
              <h4 class="font-display font-semibold text-lg mb-2">
                计算零空间
              </h4>
              <p>通过RREF解同类方程组，找到零空间的解。</p>
            </div>
          </div>
        </div>
      </section>
      `,
      faqs: `
        <section
        class="bg-surface-light dark:bg-surface-dark-hover rounded-xl p-6 border border-gray-200/10 dark:border-gray-800/10"
      >
        <h2 class="text-2xl font-display font-bold mb-6">
          常见问题
        </h2>
        <div class="space-y-4">
          ${generateFaqHtml('zh')}
        </div>
      </section>
      `,
      faqData: faqData.zh
    }
  }
};

// Add more translations following this pattern:

// de
// Spanish (es)
// French (fr)
// Hindi (hi)
// Indonesian (id)
// Italian (it)
// Japanese (ja)
// Korean (ko)
// Dutch (nl)
// Polish (pl)
// Portuguese (pt)
// Russian (ru)
// Turkish (tr)
// Vietnamese (vi)
// Chinese (zh)
