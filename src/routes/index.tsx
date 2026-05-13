import { createFileRoute } from '@tanstack/react-router'
import {
  CalendarDays,
  Car,
  Check,
  Droplets,
  Gauge,
  Gift,
  Handshake,
  Lock,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
} from 'lucide-react'
import { useMemo, useState } from 'react'

export const Route = createFileRoute('/')({
  component: EFAutoCleaning,
})

type Section = 'home' | 'gallery' | 'services' | 'abonnement' | 'parrainage' | 'booking' | 'admin'
type Booking = {
  id: number
  name: string
  phone: string
  service: string
  date: string
  time: string
  car: string
  parrain: string
  status: 'new' | 'confirmed'
}
type Subscriber = { name: string; phone: string; car: string; depuis: string }
type Referral = { parrain: string; phone: string; filleul: string; filleulPhone: string; date: string }

const phone = '06 05 59 63 81'
const phoneHref = 'tel:0605596381'
const navItems: Array<{ id: Section; label: string; featured?: boolean }> = [
  { id: 'home', label: 'Accueil' },
  { id: 'gallery', label: 'Galerie' },
  { id: 'services', label: 'Offres' },
  { id: 'abonnement', label: 'Abonnement', featured: true },
  { id: 'parrainage', label: 'Parrainage' },
  { id: 'booking', label: 'Réserver' },
  { id: 'admin', label: 'Admin' },
]

const services = [
  {
    icon: Sparkles,
    name: 'Pack Express',
    price: '50€',
    desc: "Nettoyage rapide et efficace pour remettre l'intérieur en état.",
    includes: ['Aspiration complète', 'Nettoyage tableau de bord', 'Vitres intérieures', 'Dépoussiérage rapide'],
  },
  {
    icon: ShieldCheck,
    name: 'Pack Confort',
    price: '80€',
    desc: 'Nettoyage complet en profondeur, sièges et moquettes inclus.',
    popular: true,
    includes: ['Aspiration complète', 'Tableau de bord + vitres', 'Dépoussiérage', 'Nettoyage des plastiques', 'Shampooing sièges ou moquettes'],
  },
  {
    icon: Car,
    name: 'Pack Premium',
    price: '180€',
    desc: "Le soin ultime, jusqu'aux contours de porte et moindres recoins.",
    includes: ['Tout du Pack Confort', 'Plastiques nettoyés à la brosse', 'Dans les moindres détails', 'Contours de porte nettoyés', 'Finitions soignées garanties'],
  },
]

const initialBookings: Booking[] = [
  { id: 1, name: 'Karim Bensalem', phone: '06 12 34 56 78', service: 'Pack Confort - 80€', date: '2026-05-07', time: '9h30', car: 'BMW Série 3', parrain: '', status: 'new' },
  { id: 2, name: 'Sophie Martin', phone: '07 89 01 23 45', service: 'Pack Premium - 180€', date: '2026-05-08', time: '14h30', car: 'Peugeot 5008', parrain: '', status: 'new' },
  { id: 3, name: 'Mehdi Larbi', phone: '06 55 44 33 22', service: 'Pack Express - 50€', date: '2026-05-09', time: '8h00', car: 'Renault Clio', parrain: '', status: 'new' },
]

function EFAutoCleaning() {
  const [section, setSection] = useState<Section>('home')
  const [filter, setFilter] = useState('all')
  const [selectedSlot, setSelectedSlot] = useState('')
  const [simCount, setSimCount] = useState(1)
  const [bookings, setBookings] = useState<Booking[]>(initialBookings)
  const [subscribers, setSubscribers] = useState<Subscriber[]>([
    { name: 'Thomas Dupont', phone: '06 88 77 66 55', car: 'VW Golf', depuis: 'Mai 2026' },
    { name: 'Amira Benali', phone: '07 11 22 33 44', car: 'Renault Clio', depuis: 'Avril 2026' },
  ])
  const [referrals, setReferrals] = useState<Referral[]>([])
  const [adminOpen, setAdminOpen] = useState(false)
  const [adminTab, setAdminTab] = useState<'rdv' | 'abos' | 'parr' | 'stats'>('rdv')
  const [reply, setReply] = useState<{ name: string; phone: string } | null>(null)
  const [message, setMessage] = useState('')
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [aboSuccess, setAboSuccess] = useState(false)
  const [refSuccess, setRefSuccess] = useState(false)
  const [bookingService, setBookingService] = useState('')

  const go = (id: Section) => {
    setSection(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sim = useMemo(() => {
    const normal = simCount * 50
    const total = simCount === 1 ? 29.99 : 29.99 + (simCount - 1) * 40
    return { normal, total, saved: Math.round(normal - total) }
  }, [simCount])

  const submitBooking = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const first = String(form.get('fname') || '').trim()
    const phoneValue = String(form.get('phone') || '').trim()
    const service = String(form.get('service') || '').trim()
    if (!first || !phoneValue || !service) return
    setBookings((current) => [
      ...current,
      {
        id: current.length + 1,
        name: `${first} ${String(form.get('lname') || '').trim()}`.trim(),
        phone: phoneValue,
        service,
        date: String(form.get('date') || 'À confirmer'),
        time: selectedSlot || 'À définir',
        car: String(form.get('car') || 'Non précisé'),
        parrain: String(form.get('parrain') || ''),
        status: 'new',
      },
    ])
    setBookingSuccess(true)
    event.currentTarget.reset()
    setSelectedSlot('')
  }

  const submitAbo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('abo_name') || '').trim()
    const phoneValue = String(form.get('abo_phone') || '').trim()
    if (!name || !phoneValue) return
    setSubscribers((current) => [...current, { name, phone: phoneValue, car: String(form.get('abo_car') || 'Non précisé'), depuis: '2026' }])
    setAboSuccess(true)
    event.currentTarget.reset()
  }

  const submitReferral = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const parrain = String(form.get('p_parrain') || '').trim()
    const filleul = String(form.get('p_filleul') || '').trim()
    if (!parrain || !filleul) return
    setReferrals((current) => [...current, { parrain, filleul, phone: String(form.get('p_phone') || ''), filleulPhone: String(form.get('p_filleul_phone') || ''), date: new Date().toLocaleDateString('fr-FR') }])
    setRefSuccess(true)
    event.currentTarget.reset()
  }

  const bookService = (serviceName: string) => {
    setBookingService(serviceName)
    go('booking')
  }

  return (
    <main className="site-shell">
      <div className="contact-bar"><Phone size={15} /> Appelez-nous : <a href={phoneHref}>{phone}</a><span>Mulhouse & environs - service à domicile</span></div>
      <nav className="top-nav">
        <button className="brand" onClick={() => go('home')} aria-label="Retour accueil"><span className="brand-mark">EF</span><span><strong>EF <em>AUTO</em> CLEANING</strong><small>Mulhouse & environs</small></span></button>
        <div className="nav-links">{navItems.map((item) => <button key={item.id} className={`${section === item.id ? 'active' : ''} ${item.featured ? 'featured' : ''}`} onClick={() => go(item.id)}>{item.featured && <Star size={13} />} {item.label}</button>)}</div>
        <a className="nav-phone" href={phoneHref}><Phone size={16} /> {phone}</a>
      </nav>

      {section === 'home' && <section className="page active home-page"><Hero go={go} /><ContactBlock /><HomeBanners go={go} /><Zones /><Inspection /><ServicePreview bookService={bookService} go={go} /><Testimonials /><Footer go={go} /></section>}
      {section === 'gallery' && <Gallery filter={filter} setFilter={setFilter} />}
      {section === 'services' && <Services bookService={bookService} />}
      {section === 'abonnement' && <Abonnement simCount={simCount} setSimCount={setSimCount} sim={sim} submitAbo={submitAbo} success={aboSuccess} />}
      {section === 'parrainage' && <Parrainage submitReferral={submitReferral} success={refSuccess} />}
      {section === 'booking' && <BookingForm submitBooking={submitBooking} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} bookingService={bookingService} success={bookingSuccess} />}
      {section === 'admin' && <Admin adminOpen={adminOpen} setAdminOpen={setAdminOpen} adminTab={adminTab} setAdminTab={setAdminTab} bookings={bookings} subscribers={subscribers} referrals={referrals} setBookings={setBookings} setReply={setReply} />}
      {reply && <ReplyModal reply={reply} message={message || `Bonjour ${reply.name.split(' ')[0]},\n\nVotre rendez-vous EF Auto Cleaning est confirmé.\nPour toute question : ${phone}\n\nCordialement,\nEF Auto Cleaning`} setMessage={setMessage} onClose={() => setReply(null)} />}
    </main>
  )
}

function Hero({ go }: { go: (id: Section) => void }) {
  return <div className="hero"><div className="hero-copy"><div className="eyebrow"><MapPin size={15} /> Service à domicile - Mulhouse & environs</div><h1>Votre voiture <span>comme neuve</span> à domicile</h1><p>Nettoyage intérieur professionnel directement chez vous à Mulhouse et dans un rayon de 30 km. Résultats nets, intervention ponctuelle, contact direct.</p><div className="actions"><a className="btn gold" href={phoneHref}><Phone size={17} /> {phone}</a><button className="btn dark" onClick={() => go('booking')}><CalendarDays size={17} /> Prendre RDV</button><button className="btn green" onClick={() => go('abonnement')}><Star size={17} /> Abonnement 29,99€</button></div><div className="stats"><span><strong>200+</strong> voitures traitées</span><span><strong>5★</strong> note moyenne</span><span><strong>3h</strong> durée moyenne</span></div></div><div className="hero-emblem"><span>EF</span><small>Auto Cleaning</small></div></div>
}

function SectionTitle({ title, accent, sub }: { title: string; accent: string; sub: string }) { return <header className="section-header"><h2>{title} <span>{accent}</span></h2><p>{sub}</p></header> }
function ContactBlock() { return <div className="wide-card contact-block"><div><Phone size={34} /><span><strong>Contactez-nous directement</strong><small>Disponible 7j/7 - réponse rapide garantie</small></span></div><a href={phoneHref}>{phone}</a></div> }
function HomeBanners({ go }: { go: (id: Section) => void }) { return <><button className="wide-card abo-banner" onClick={() => go('abonnement')}><span><Star size={34} /><b>Abonnement mensuel</b><small>1 nettoyage inclus + -20% sur chaque passage supplémentaire + priorité réservation</small></span><strong>29,99€<small>/ mois</small></strong></button><div className="wide-card referral-banner"><span><Handshake size={32} /><b>Programme parrainage</b><small>Vous nous apportez un client : -10€ sur votre prochain nettoyage</small></span><strong>-10€</strong></div></> }
function Zones() { return <div className="wide-card zone-card"><MapPin size={30} /><div><h3>Zone d'intervention</h3><p>Déplacement à <b>Mulhouse</b> et dans un rayon de <b>30 km</b>.</p><div className="tags">{['Mulhouse','Illzach','Wittenheim','Kingersheim','Riedisheim','Brunstatt','Lutterbach','Pfastatt','Habsheim','Saint-Louis','Thann','et environs'].map((z) => <span key={z}>{z}</span>)}</div></div></div> }
function Inspection() { return <div className="wide-card inspection"><h3><Gift size={20} /> Inspection gratuite incluse</h3><p>Vérification gratuite des niveaux à chaque prestation.</p><div className="inspection-grid"><span><Gauge /> Liquide de refroidissement <b>GRATUIT</b></span><span><Droplets /> Liquide lave-glace <b>GRATUIT</b></span></div></div> }
function ServicePreview({ bookService, go }: { bookService: (s: string) => void; go: (id: Section) => void }) { return <div className="preview"><h2>Nos <span>formules</span></h2><div className="mini-services">{services.map((s) => <article key={s.name}><s.icon /><h3>{s.name}</h3><strong>{s.price}</strong><small>+ inspection gratuite</small><button onClick={() => s.name === 'Pack Confort' ? bookService(`${s.name} - ${s.price}`) : go('services')}>Voir le détail</button></article>)}</div></div> }
function Testimonials() { return <div className="testimonials"><h2>Ce qu'ils en <span>disent</span></h2>{['Résultat bluffant ! Mon intérieur est impeccable, comme neuf. Très professionnel.','Service top, très ponctuel. Le siège en cuir est parfaitement nettoyé.','L’abonnement mensuel est top : simple, régulier et avantageux.','Très bon travail, prestation complète. Rapport qualité/prix excellent.'].map((text, i) => <article key={text}><div>★★★★★</div><p>“{text}”</p><strong>{['Karim B.','Nathalie M.','Sofiane L.','Isabelle R.'][i]}</strong><small>{['BMW Série 3 - Mulhouse','Renault Kadjar - Illzach','Peugeot 308 - Wittenheim','Citroën C5 - Saint-Louis'][i]}</small></article>)}</div> }

function Gallery({ filter, setFilter }: { filter: string; setFilter: (f: string) => void }) { const items = [['siege','Sièges cuir'],['tapis','Tapis'],['tableau','Tableau de bord'],['vitres','Vitres'],['tapis','Sols complets'],['siege','Banquette'],['tableau','Commandes'],['vitres','Pare-brise']]; return <section className="page active"><SectionTitle title="Mes" accent="réalisations" sub="Avant / après - chaque voiture mérite le meilleur soin" /><div className="filters">{['all','siege','tapis','tableau','vitres'].map((f) => <button key={f} className={filter === f ? 'active' : ''} onClick={() => setFilter(f)}>{f === 'all' ? 'Tout voir' : f}</button>)}</div><div className="before-after"><article><b>Avant</b><Car size={56} /><p>Sièges tachés, poussière, tapis encrassés</p></article><article><b>Après</b><Sparkles size={56} /><p>Intérieur immaculé, odeur fraîche</p></article></div><div className="gallery-grid">{items.filter(([cat]) => filter === 'all' || filter === cat).map(([cat, label], i) => <article key={`${label}-${i}`} className={i % 4 === 0 ? 'tall' : ''}><div className={`gallery-visual ${cat}`}><Sparkles /></div><span>{label}</span></article>)}</div></section> }
function Services({ bookService }: { bookService: (s: string) => void }) { return <section className="page active"><SectionTitle title="Nos" accent="formules" sub="Nettoyage intérieur à domicile - Mulhouse & environs" /><div className="services-grid">{services.map((s) => <article className={`service-card ${s.popular ? 'popular' : ''}`} key={s.name}>{s.popular && <span className="popular-badge">Populaire</span>}<s.icon size={36} /><h3>{s.name}</h3><p>{s.desc}</p><ul>{s.includes.map((item) => <li key={item}><Check size={15} /> {item}</li>)}<li className="gift"><Gift size={15} /> Inspection niveaux offerte</li></ul><strong>{s.price} <small>/ véhicule</small></strong><button onClick={() => bookService(`${s.name} - ${s.price}`)}>Réserver</button></article>)}</div><div className="wide-card quote-card"><span><b>Besoin d'un devis ?</b><small>SUV, utilitaire, camping-car... adaptation à tous les véhicules.</small></span><a href={phoneHref}>{phone}</a></div></section> }
function Abonnement({ simCount, setSimCount, sim, submitAbo, success }: { simCount: number; setSimCount: (n: number) => void; sim: { normal: number; total: number; saved: number }; submitAbo: (e: React.FormEvent<HTMLFormElement>) => void; success: boolean }) { return <section className="page active"><SectionTitle title="Abonnement" accent="mensuel" sub="Le meilleur moyen de garder votre voiture toujours propre" /><div className="abo-page"><div className="abo-main"><div><span className="pill">Offre exclusive</span><h2>Pack abonnement mensuel</h2><p>1 nettoyage intérieur inclus chaque mois, priorité de réservation et -20% sur chaque passage supplémentaire.</p></div><strong>29,99€<small>par mois</small></strong></div><div className="features">{[['Nettoyage inclus','Pack Express inclus, valeur 50€'],['-20% supplémentaire','Réduction sur chaque passage en plus'],['Priorité réservation','Créneaux réservés avant les autres clients'],['Inspection offerte','Niveaux vérifiés gratuitement']].map(([a,b]) => <article key={a}><Star /><b>{a}</b><p>{b}</p></article>)}</div><div className="simulator"><h3>Simulez vos économies</h3><div className="sim-options">{[1,2,3].map((n) => <button className={simCount === n ? 'active' : ''} key={n} onClick={() => setSimCount(n)}>{n} fois</button>)}</div><div className="sim-result"><p>Sans abonnement : <b>{sim.normal}€</b></p><p>Avec abonnement : <b>{sim.total.toFixed(2).replace('.', ',')}€</b></p><strong>Économie : {sim.saved}€</strong></div></div><FormCard title="Je m'abonne" submit={submitAbo} button="S'abonner pour 29,99€/mois" success={success} green fields={[['abo_name','Prénom & Nom'],['abo_phone','Téléphone'],['abo_address','Adresse'],['abo_car','Votre véhicule']]} /></div></section> }
function Parrainage({ submitReferral, success }: { submitReferral: (e: React.FormEvent<HTMLFormElement>) => void; success: boolean }) { return <section className="page active"><SectionTitle title="Programme" accent="parrainage" sub="Partagez EF Auto Cleaning et économisez à chaque filleul" /><div className="parrainage-page"><div className="hero-card"><span>Offre exclusive</span><strong>-10€</strong><p>pour chaque client que vous nous apportez</p></div><div className="steps">{['Vous parlez de nous','Votre filleul réserve','Vous gagnez -10€'].map((s,i) => <article key={s}><b>0{i+1}</b><Handshake /><h3>{s}</h3></article>)}</div><FormCard title="Parrainer un proche" submit={submitReferral} button="Envoyer mon parrainage" success={success} fields={[['p_parrain','Votre prénom'],['p_phone','Votre téléphone'],['p_filleul','Prénom du filleul'],['p_filleul_phone','Téléphone du filleul']]} /></div></section> }
function FormCard({ title, fields, submit, button, success, green }: { title: string; fields: string[][]; submit: (e: React.FormEvent<HTMLFormElement>) => void; button: string; success: boolean; green?: boolean }) { return <form className="form-card" onSubmit={submit}><h3>{title}</h3><p>Ou appelez directement : <a href={phoneHref}>{phone}</a></p>{fields.map(([name,label]) => <label key={name}>{label}<input name={name} placeholder={label} /></label>)}<button className={green ? 'green-submit' : ''}>{button}</button>{success && <div className="success">Demande reçue. Contact rapide au {phone}.</div>}</form> }
function BookingForm({ submitBooking, selectedSlot, setSelectedSlot, bookingService, success }: { submitBooking: (e: React.FormEvent<HTMLFormElement>) => void; selectedSlot: string; setSelectedSlot: (s: string) => void; bookingService: string; success: boolean }) { return <section className="page active"><SectionTitle title="Prendre" accent="rendez-vous" sub="Formulaire ou appel direct" /><form className="booking-form" onSubmit={submitBooking}><h3>Votre réservation</h3><div className="form-row"><label>Prénom<input name="fname" required /></label><label>Nom<input name="lname" /></label></div><div className="form-row"><label>Téléphone<input name="phone" required /></label><label>Email<input name="email" type="email" /></label></div><label>Adresse d'intervention<input name="address" placeholder="Rue, code postal, ville" /></label><div className="form-row"><label>Formule souhaitée<select name="service" required defaultValue={bookingService} key={bookingService}><option value="">Choisir...</option><option>Pack Express - 50€</option><option>Pack Confort - 80€</option><option>Pack Premium - 180€</option><option>Abonné - 1 nettoyage inclus</option><option>Abonné - nettoyage supplémentaire (-20%)</option><option>Devis personnalisé</option></select></label><label>Type de véhicule<select name="vehicleType"><option>Citadine / Berline</option><option>SUV / Crossover</option><option>Monospace</option><option>Utilitaire</option></select></label></div><label>Marque & modèle<input name="car" /></label><label>Parrainé par<input name="parrain" /></label><label>Date souhaitée<input name="date" type="date" min={new Date().toISOString().split('T')[0]} /></label><div className="slots">{['8h00','9h30','11h00','13h00','14h30','16h00','17h30','19h00'].map((slot) => <button type="button" key={slot} disabled={['11h00','16h00'].includes(slot)} className={selectedSlot === slot ? 'selected' : ''} onClick={() => setSelectedSlot(slot)}>{slot}</button>)}</div><div className="free-note"><Gift size={16} /> Inspection gratuite incluse</div><label>Message<textarea name="message" /></label><button>Envoyer ma demande de RDV</button>{success && <div className="success">Demande envoyée. Rappel rapide prévu.</div>}</form></section> }
function Admin(props: { adminOpen: boolean; setAdminOpen: (v: boolean) => void; adminTab: 'rdv'|'abos'|'parr'|'stats'; setAdminTab: (v: 'rdv'|'abos'|'parr'|'stats') => void; bookings: Booking[]; subscribers: Subscriber[]; referrals: Referral[]; setBookings: React.Dispatch<React.SetStateAction<Booking[]>>; setReply: (r: {name:string; phone:string}) => void }) { const [pw, setPw] = useState(''); const login = (e: React.FormEvent) => { e.preventDefault(); if (['ef2024','admin'].includes(pw)) props.setAdminOpen(true) }; return <section className="page active admin-page"><div className="admin-head"><h2>Espace <span>admin</span></h2>{props.adminOpen && <button onClick={() => props.setAdminOpen(false)}>Déconnexion</button>}</div>{!props.adminOpen ? <form className="login-card" onSubmit={login}><Lock /><h3>Connexion</h3><input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="Mot de passe" /><button>Se connecter</button><small>Mot de passe par défaut : ef2024</small></form> : <><div className="tabs">{(['rdv','abos','parr','stats'] as const).map((t) => <button key={t} className={props.adminTab === t ? 'active' : ''} onClick={() => props.setAdminTab(t)}>{t}{t === 'rdv' && <span>{props.bookings.filter((b) => b.status === 'new').length}</span>}</button>)}</div>{props.adminTab === 'rdv' && <div className="rdv-list">{props.bookings.map((b) => <article key={b.id}><div><h3>{b.name} {b.status === 'new' && <span>Nouveau</span>}</h3><p>{b.phone} | {b.car} {b.parrain && `| Parrain: ${b.parrain}`}</p><button onClick={() => props.setBookings((current) => current.map((item) => item.id === b.id ? { ...item, status: 'confirmed' } : item))}>Confirmer</button><button onClick={() => props.setReply({ name: b.name, phone: b.phone })}>Répondre</button><button onClick={() => props.setBookings((current) => current.filter((item) => item.id !== b.id))}>Refuser</button></div><strong>{b.service}<small>{b.date} - {b.time}</small></strong></article>)}</div>}{props.adminTab === 'abos' && <SimpleList items={props.subscribers.map((s) => [`⭐ ${s.name}`, `${s.phone} | ${s.car}`, '29,99€/mois'])} />}{props.adminTab === 'parr' && (props.referrals.length ? <SimpleList items={props.referrals.map((r) => [`${r.parrain} → ${r.filleul}`, `${r.phone} | ${r.filleulPhone}`, '-10€ à appliquer'])} /> : <p className="empty">Aucun parrainage enregistré.</p>)}{props.adminTab === 'stats' && <div className="stat-grid">{[['12','RDV ce mois'],['3','Abonnés actifs'],['870€','Revenus mois'],['4.9','Note moyenne']].map(([a,b]) => <article key={b}><b>{a}</b><small>{b}</small></article>)}</div>}</>}</section> }
function SimpleList({ items }: { items: string[][] }) { return <div className="rdv-list">{items.map(([a,b,c]) => <article key={a}><div><h3>{a}</h3><p>{b}</p></div><strong>{c}</strong></article>)}</div> }
function ReplyModal({ reply, message, setMessage, onClose }: { reply: { name: string; phone: string }; message: string; setMessage: (v: string) => void; onClose: () => void }) { return <div className="modal"><form><h3>Répondre au client</h3><p>À : {reply.name} - {reply.phone}</p><textarea value={message} onChange={(e) => setMessage(e.target.value)} /><div><button type="button" onClick={onClose}>Annuler</button><button type="button" onClick={onClose}>Envoyer</button></div></form></div> }
function Footer({ go }: { go: (id: Section) => void }) { return <footer><div><h3>EF <span>Auto</span> Cleaning</h3><p>Nettoyage intérieur professionnel à domicile - Mulhouse et environs 30 km.</p></div><div><h4>Navigation</h4>{navItems.slice(1,6).map((n) => <button key={n.id} onClick={() => go(n.id)}>{n.label}</button>)}</div><div><h4>Contact</h4><a href={phoneHref}>{phone}</a><p>Mulhouse (68) & 30 km</p><p>Disponible 7j/7</p></div></footer> }
