export default function Home() {
  return (
    <div className="min-h-screen bg-sigeb-gray">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-sigeb-blue to-sigeb-blue-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Oportunidades que transforman vidas
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-sigeb-light max-w-3xl mx-auto">
            Encuentra programas de becas del Ministerio de Educación de Guatemala y realiza tu proceso
            de postulación de forma sencilla, segura y transparente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/convocatorias"
              className="bg-sigeb-gold text-sigeb-blue-dark px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
            >
              Explorar becas
            </a>
            <a
              href="/consulta"
              className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-sigeb-blue transition-colors"
            >
              Consultar mi solicitud
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-sigeb-blue-dark mb-12">Sobre SIGEB</h2>
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-gray-600 mb-8">
              SIGEB es la plataforma para la gestión integral de programas de becas del Ministerio de
              Educación de Guatemala.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="text-4xl text-sigeb-gold mb-4">✓</div>
                <h3 className="font-semibold text-sigeb-blue-dark mb-2">Información clara</h3>
                <p className="text-gray-600">Acceso sencillo a todos los programas de becas disponibles</p>
              </div>
              <div className="p-6">
                <div className="text-4xl text-sigeb-gold mb-4">✓</div>
                <h3 className="font-semibold text-sigeb-blue-dark mb-2">Seguimiento de solicitudes</h3>
                <p className="text-gray-600">Consulta el estado de tu postulación en tiempo real</p>
              </div>
              <div className="p-6">
                <div className="text-4xl text-sigeb-gold mb-4">✓</div>
                <h3 className="font-semibold text-sigeb-blue-dark mb-2">Proceso transparente</h3>
                <p className="text-gray-600">Evaluación justa y decisiones documentadas</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-sigeb-gray">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-sigeb-blue-dark mb-12">
            ¿Cómo solicitar una beca?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="text-5xl font-bold text-sigeb-blue mb-4">01</div>
              <h3 className="font-semibold text-sigeb-blue-dark mb-2">REGÍSTRATE</h3>
              <p className="text-gray-600">Crea tu cuenta con tu CUI</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl font-bold text-sigeb-blue mb-4">02</div>
              <h3 className="font-semibold text-sigeb-blue-dark mb-2">POSTÚLATE</h3>
              <p className="text-gray-600">Selecciona una convocatoria</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl font-bold text-sigeb-blue mb-4">03</div>
              <h3 className="font-semibold text-sigeb-blue-dark mb-2">DOCUMENTA</h3>
              <p className="text-gray-600">Carga los requisitos</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl font-bold text-sigeb-blue mb-4">04</div>
              <h3 className="font-semibold text-sigeb-blue-dark mb-2">EVALUACIÓN</h3>
              <p className="text-gray-600">Tu solicitud es evaluada</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl font-bold text-sigeb-blue mb-4">05</div>
              <h3 className="font-semibold text-sigeb-blue-dark mb-2">COMITÉ</h3>
              <p className="text-gray-600">Se revisa tu expediente</p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl font-bold text-sigeb-blue mb-4">06</div>
              <h3 className="font-semibold text-sigeb-blue-dark mb-2">RESULTADO</h3>
              <p className="text-gray-600">Consulta tu resolución</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-sigeb-blue-dark text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">SIGEB</h3>
              <p className="text-sigeb-light text-sm">
                Sistema Integral de Gestión de Becas
              </p>
              <p className="text-sigeb-light text-sm mt-2">
                Ministerio de Educación
              </p>
              <p className="text-sigeb-light text-sm">República de Guatemala</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">INSTITUCIONAL</h4>
              <ul className="space-y-2 text-sm text-sigeb-light">
                <li><a href="/" className="hover:text-white">Inicio</a></li>
                <li><a href="/nosotros" className="hover:text-white">Sobre SIGEB</a></li>
                <li><a href="/transparencia" className="hover:text-white">Transparencia</a></li>
                <li><a href="/contacto" className="hover:text-white">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">BECAS</h4>
              <ul className="space-y-2 text-sm text-sigeb-light">
                <li><a href="/convocatorias" className="hover:text-white">Convocatorias</a></li>
                <li><a href="/requisitos" className="hover:text-white">Requisitos</a></li>
                <li><a href="/faq" className="hover:text-white">Preguntas frecuentes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">AYUDA</h4>
              <ul className="space-y-2 text-sm text-sigeb-light">
                <li><a href="/ayuda" className="hover:text-white">Centro de ayuda</a></li>
                <li><a href="/consulta" className="hover:text-white">Consultar solicitud</a></li>
                <li><a href="/soporte" className="hover:text-white">Soporte</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-sigeb-light mt-8 pt-8 text-center text-sm text-sigeb-light">
            <p>© 2026 Ministerio de Educación de Guatemala. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
