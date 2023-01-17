import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {

  const salt = await bcrypt.genSalt();
  let password1 = await bcrypt.hash("Dapurkata2022!", salt);

  const userData = [
    {
      name: "dapurkata",
      username: "dapurkata",
      password: password1
    },
  ]

  const bookData: Prisma.BookCreateInput[] = [
    {
      title: "Narrative Inquiry For Teacher Education: Learning from the past stories for today and future",
      authorName: "Dr. Nur Arifah Drajati, M.Pd.",
      price: 50000,
      stock: 100,
      publisher: "Penerbit DapurKata",
      description: "Teachers nowadays are engaging in research. They are upgrading the teacher identity value by being teacher researchers. Teachers might have recognized lots of methods for conducting research. Narrative inquiry is one considerable research design that allows researchers explore and study the lived experiences of human being. This is the book that teacher researchers might need, not limited to pre-service teachers, in-service teachers, novice teachers, or experienced teachers. It provides insightful direction for teachers in conducting research, whether they are researching other people or their own experience.",
      printType: "E-Book",
      numberOfPages: 192,
      isbn: "Masih dalam proses",
      slug: "narrative-inquiry-for-teacher-education-learning-from-the-past-stories-for-today-and-future",
      Image: {
        create: {
          publicId: "dapurkata/books/1_q1urcu",
          url: 'http://res.cloudinary.com/diw72nenn/image/upload/v1672974973/dapurkata/books/1_q1urcu.jpg',
          secureUrl: 'https://res.cloudinary.com/diw72nenn/image/upload/v1672974973/dapurkata/books/1_q1urcu.jpg'
        }
      }
    },
    {
      title: "TEACHING AND LEARNING ACADEMIC WRITING WITH ARTIFICIAL INTELLIGENCE (AI) SUPPORT",
      authorName: "Nur Arifah Drajati, Anis Handayani",
      price: 50000,
      stock: 100,
      publisher: "Penerbit DapurKata",
      description: "Academic Writing is essential for students. However, how to learn and teach Academic Writing effectively needs to be further researched. Along with the rapid development of educational technology, teaching and learning for academic writing supported by technology also develops simultaneously. One of technologies adopted to support academic writing is artificial intelligence (AI) technology embedded in writing-assisted programs such as Project Essay Grade (PEG), Intelligent Essay Assessor by Pearson, Criterion by Educational Testing Service, My Access! by Vantage, Write & Improve by Cambridge English, Write to Learn by Pearson, Grammarly, Scribo by Literatu, and so on",
      printType: "E-Book",
      numberOfPages: 116,
      isbn: "Masih dalam proses",
      slug: "teaching-and-learning-academic-writing-wtih-artificial-intelligence-support",
      Image: {
        create: {
          publicId: "dapurkata/books/2_ydc24h",
          url: 'http://res.cloudinary.com/diw72nenn/image/upload/v1672984134/dapurkata/books/2_ydc24h.jpg',
          secureUrl: 'https://res.cloudinary.com/diw72nenn/image/upload/v1672984134/dapurkata/books/2_ydc24h.jpg',
        }
      }
    },
    {
      title: "Self Management bagi Anak Tunanetra",
      authorName: "Mohammad Anwar, Supriyadi, Donni Prakosha",
      price: 50000,
      stock: 100,
      publisher: "Penerbit DapurKata",
      description: "Anak berkebutuhan khusus  juga merupakan Warga Negara Indonesia yang memiliki hak dan kewajiban yang sama. seusuai Undang-Undang yang berlaku. Namun hingga saat ini kualitas layanan pendidikan khusus  dan disability awareness masih belum berkembangan dengan baik.  stock komunitasnya yang relatif kecil menyebabkan kurang mendapatkan perhatian baik dari segi impementasi atas segala kebijakan yang ada. Mulai dari layanan pendidikan yang bermutu, kesempatan dalam bekerja, dan berprestasi",
      printType: "E-Book",
      numberOfPages: 96,
      isbn: "Masih dalam proses",
      slug: "self-management-bagi-anak-tunanetra",
      Image: {
        create: {
          publicId: "dapurkata/books/3_tefwwd",
          url: 'http://res.cloudinary.com/diw72nenn/image/upload/v1672974975/dapurkata/books/3_tefwwd.jpg',
          secureUrl: 'https://res.cloudinary.com/diw72nenn/image/upload/v1672974975/dapurkata/books/3_tefwwd.jpg',
        }
      }
    },
    {
      title: "Konvergensi Teori di Era Teknologi Digital: Penyatuan Ranah Komunikasi Massa dan Interpersonal",
      authorName: "Dra. Prahastiwi Utari, M.Si., Ph.D.",
      price: 50000,
      stock: 100,
      publisher: "Penerbit DapurKata",
      description: "Perkembangan teknologi komunikasi terutama komunikasi digital, membawa perubahan yang signifikan dalam teori dan riset komunikasi. Pembagian teori komunikasi antara interpersonal dan media massa yang dianggap sebagai sesuatu yang diyaniki para ilmuwan komunikasi sebagai pembagian yang jelas dan alami dari keilmuan Komunikasi, diera digital teknologi sudah mencair satu sama lain, kabur batasan diantara keduanya bahkan menyatu atau konvergen.",
      printType: "E-Book",
      numberOfPages: 188,
      isbn: "Masih dalam proses",
      slug: "konvergensi-teori-di-era-teknologi-digital-penyatuan-ranah-komunikasi-massa-dan-interpersonal",
      Image: {
        create: {
          publicId: "dapurkata/books/4_k6qi2n",
          url: 'http://res.cloudinary.com/diw72nenn/image/upload/v1672974973/dapurkata/books/4_k6qi2n.jpg',
          secureUrl: 'https://res.cloudinary.com/diw72nenn/image/upload/v1672974973/dapurkata/books/4_k6qi2n.jpg',
        }
      }
    },
    {
      title: "Sastra Siber (Cyber Literature) Eksistensi dan Pemanfaatannya dalam Pembelajaran Sastra",
      authorName: "Prof. Dr. Sarwiji Suwandi, M.Pd., Dr. Sugit Zulianto, M.Pd., Chafit Ulya, S.Pd., M.Pd.",
      price: 50000,
      stock: 100,
      publisher: "Penerbit DapurKata",
      description: "ksistensi sastra terus dinamis selaras dengan dinamika budaya masyarakat. Ia bertumbuh kembang, tergantung juga pada media yang tersedia di lingkungan masyarakat. Pada masa lalu, kegiatan bersastra sudah berlangsung. Saat itu, keberadaan media masih sangat terbatas. Akibatnya, sastra dilahirkan dalam bentuk lisan sehingga dikenal dengan sastra lisan. Begitu adanya, lalu, sastra lisan disebarluaskan dan diteruskan kepada regenerasi dengan mengandalkan lisan penutur, termasuk pendongeng. Sejauh perluasan publikasinya, sastra lisan diterapkan saat upacara- upacara adat dan/atau kala perayaan tradisi di daerah tertentu.",
      printType: "E-Book",
      numberOfPages: 361,
      isbn: "Masih dalam proses",
      slug: "sastra-siber-eksistensi-dan-pemanfaatannya-dalam-pembelajaran-sastra",
      Image: {
        create: {
          publicId: "dapurkata/books/5_jqphtw",
          url: 'http://res.cloudinary.com/diw72nenn/image/upload/v1672974975/dapurkata/books/5_jqphtw.jpg',
          secureUrl: 'https://res.cloudinary.com/diw72nenn/image/upload/v1672974975/dapurkata/books/5_jqphtw.jpg',
        }
      }
    },
  ]

  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  for (const u of bookData) {
    const book = await prisma.book.create({
      data: u,
    })
    console.log(`Created book with id: ${book.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
