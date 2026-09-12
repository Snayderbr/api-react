import { useEffect, useState } from 'react'
import Modal from '../components/Modal'
import { api } from '../services/api'

const initial = {
  serial: '', titulo: '', sinopsis: '', url: '', imagen: '', anio_estreno: '',
  genero_id: '', director_id: '', productora_id: '', tipo_id: ''
}

const numericFields = ['anio_estreno', 'genero_id', 'director_id', 'productora_id', 'tipo_id']

function MediaCard({ item, onEdit, onRemove }) {
  const [imgError, setImgError] = useState(false)

  return (
    <article className="media-card">
      {item.imagen && !imgError
        ? <img src={item.imagen} alt={item.titulo} onError={() => setImgError(true)} />
        : <div className="poster-placeholder">🎬</div>
      }
      <div className="media-content">
        <span className="badge">{item.tipo?.nombre || 'Media'}</span>
        <h3>{item.titulo}</h3>
        <p>{item.sinopsis || 'Sin sinopsis.'}</p>
        <small>{item.anio_estreno} · {item.genero?.nombre || 'Sin género'} · {item.director?.nombres || 'Sin director'}</small>
        <div className="actions">
          <button className="small-button" onClick={() => onEdit(item)}>Editar</button>
          <button className="small-button danger" onClick={() => onRemove(item.id)}>Eliminar</button>
        </div>
      </div>
    </article>
  )
}

function SelectField({ label, value, onChange, options, labelKey = 'nombre' }) {
  return (
    <label>
      <span>{label}</span>
      <select required value={value} onChange={onChange}>
        <option value="">Seleccione...</option>
        {options.map((x) => <option key={x.id} value={x.id}>{x[labelKey]}</option>)}
      </select>
    </label>
  )
}

function MediaForm({ form, onChange, onClose, onSubmit, generos, directores, productoras, tipos }) {
  const f = (field) => (e) => onChange(field, e.target.value)

  return (
    <form onSubmit={onSubmit} className="form-grid">
      <label><span>Serial</span><input required value={form.serial} onChange={f('serial')} /></label>
      <label><span>Título</span><input required value={form.titulo} onChange={f('titulo')} /></label>
      <label className="full"><span>Sinopsis</span><textarea rows="3" value={form.sinopsis} onChange={f('sinopsis')} /></label>
      <label><span>URL</span><input type="url" required value={form.url} onChange={f('url')} /></label>
      <label><span>Imagen (URL)</span><input type="url" value={form.imagen} onChange={f('imagen')} /></label>
      <label><span>Año de estreno</span><input type="number" min="1888" max="2100" required value={form.anio_estreno} onChange={f('anio_estreno')} /></label>
      <SelectField label="Género"     value={form.genero_id}     onChange={f('genero_id')}     options={generos}     />
      <SelectField label="Director"   value={form.director_id}   onChange={f('director_id')}   options={directores}  labelKey="nombres" />
      <SelectField label="Productora" value={form.productora_id} onChange={f('productora_id')} options={productoras} />
      <SelectField label="Tipo"       value={form.tipo_id}       onChange={f('tipo_id')}       options={tipos}       />
      <div className="form-actions full">
        <button type="button" className="secondary-button" onClick={onClose}>Cancelar</button>
        <button className="primary-button">Guardar</button>
      </div>
    </form>
  )
}

function MediaGrid({ loading, items, onEdit, onRemove }) {
  if (loading) return <p className="empty">Cargando...</p>
  if (items.length === 0) return <p className="empty">No hay películas o series todavía.</p>
  return (
    <div className="media-grid">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} onEdit={onEdit} onRemove={onRemove} />
      ))}
    </div>
  )
}

export default function Media() {
  const [items, setItems] = useState([])
  const [generos, setGeneros] = useState([])
  const [directores, setDirectores] = useState([])
  const [productoras, setProductoras] = useState([])
  const [tipos, setTipos] = useState([])
  const [form, setForm] = useState(initial)
  const [editingId, setEditingId] = useState(null)
  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const load = async () => {
    try {
      setLoading(true)
      const [media, g, d, p, t] = await Promise.all([
        api.get('/medias'), api.get('/generos?estado=Activo'), api.get('/directores?estado=Activo'),
        api.get('/productoras?estado=Activo'), api.get('/tipos')
      ])
      setItems(media.data || [])
      setGeneros(g.data || [])
      setDirectores(d.data || [])
      setProductoras(p.data || [])
      setTipos(t.data || [])
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const openNew = () => {
    setEditingId(null)
    setForm(initial)
    setOpen(true)
  }

  const edit = (item) => {
    setEditingId(item.id)
    setForm({
      serial:       item.serial || '',
      titulo:       item.titulo || '',
      sinopsis:     item.sinopsis || '',
      url:          item.url || '',
      imagen:       item.imagen || '',
      anio_estreno: item.anio_estreno || '',
      genero_id:    item.genero_id    || item.genero?.id    || '',
      director_id:  item.director_id  || item.director?.id  || '',
      productora_id:item.productora_id|| item.productora?.id|| '',
      tipo_id:      item.tipo_id      || item.tipo?.id      || '',
    })
    setOpen(true)
  }

  const handleChange = (field, value) => setForm({ ...form, [field]: value })

  const save = async (event) => {
    event.preventDefault()
    try {
      const payload = { ...form }
      numericFields.forEach((f) => { payload[f] = Number(payload[f]) })
      if (editingId) await api.put(`/medias/${editingId}`, payload)
      else await api.post('/medias', payload)
      setOpen(false)
      setForm(initial)
      setEditingId(null)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const remove = async (id) => {
    if (!window.confirm('¿Eliminar esta película/serie?')) return
    try {
      await api.delete(`/medias/${id}`)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <section>
      <div className="page-heading">
        <div><p className="eyebrow">Contenido</p><h1>Películas y Series</h1></div>
        <button className="primary-button" onClick={openNew}>+ Nueva Media</button>
      </div>

      {error && <div className="alert">{error}</div>}

      <MediaGrid loading={loading} items={items} onEdit={edit} onRemove={remove} />

      {open && (
        <Modal title={`${editingId ? 'Editar' : 'Nueva'} Media`} onClose={() => setOpen(false)}>
          <MediaForm
            form={form}
            onChange={handleChange}
            onClose={() => setOpen(false)}
            onSubmit={save}
            generos={generos}
            directores={directores}
            productoras={productoras}
            tipos={tipos}
          />
        </Modal>
      )}
    </section>
  )
}