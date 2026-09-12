import { useEffect, useState } from 'react'
import Modal from './Modal'
import { api } from '../services/api'

function FieldInput({ field, value, onChange }) {
  if (field.type === 'select') {
    return (
      <select value={value} onChange={onChange} required={field.required}>
        <option value="">Seleccione...</option>
        {field.options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    )
  }
  if (field.type === 'textarea') {
    return <textarea rows="4" value={value} onChange={onChange} required={field.required} />
  }
  return <input type={field.type || 'text'} value={value} onChange={onChange} required={field.required} />
}

function CrudTable({ columns, items, onEdit, onRemove }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => <th key={column.key}>{column.label}</th>)}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              {columns.map((column) => (
                <td key={column.key}>{column.render ? column.render(item) : item[column.key]}</td>
              ))}
              <td className="actions">
                <button className="small-button" onClick={() => onEdit(item)}>Editar</button>
                <button className="small-button danger" onClick={() => onRemove(item.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function CrudForm({ fields, form, onChange, onClose, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="form-grid">
      {fields.map((field) => (
        <label key={field.name} className={field.full ? 'full' : ''}>
          <span>{field.label}</span>
          <FieldInput
            field={field}
            value={form[field.name]}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
        </label>
      ))}
      <div className="form-actions full">
        <button type="button" className="secondary-button" onClick={onClose}>Cancelar</button>
        <button type="submit" className="primary-button">Guardar</button>
      </div>
    </form>
  )
}

export default function CrudPage({ title, singular, endpoint, fields, columns }) {
  const emptyForm = Object.fromEntries(fields.map((f) => [f.name, f.default ?? '']))
  const [items, setItems] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const response = await api.get(endpoint)
      setItems(response.data || [])
      setError('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [endpoint])

  const openNew = () => {
    setEditingId(null)
    setForm(emptyForm)
    setError('')
    setOpen(true)
  }

  const openEdit = (item) => {
    setEditingId(item.id)
    setForm(Object.fromEntries(fields.map((f) => [f.name, item[f.name] ?? ''])))
    setError('')
    setOpen(true)
  }

  const save = async (event) => {
    event.preventDefault()
    try {
      if (editingId) await api.put(`${endpoint}/${editingId}`, form)
      else await api.post(endpoint, form)
      setOpen(false)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const remove = async (id) => {
    if (!window.confirm(`¿Eliminar ${singular.toLowerCase()}?`)) return
    try {
      await api.delete(`${endpoint}/${id}`)
      await load()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleFieldChange = (name, value) => setForm({ ...form, [name]: value })

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">Administración</p>
          <h1>{title}</h1>
        </div>
        <button className="primary-button" onClick={openNew}>+ Nuevo {singular}</button>
      </div>

      {error && <div className="alert">{error}</div>}

      <div className="card table-card">
        {loading && <p className="empty">Cargando...</p>}
        {!loading && items.length === 0 && <p className="empty">No hay registros todavía.</p>}
        {!loading && items.length > 0 && (
          <CrudTable columns={columns} items={items} onEdit={openEdit} onRemove={remove} />
        )}
      </div>

      {open && (
        <Modal title={`${editingId ? 'Editar' : 'Nuevo'} ${singular}`} onClose={() => setOpen(false)}>
          <CrudForm
            fields={fields}
            form={form}
            onChange={handleFieldChange}
            onClose={() => setOpen(false)}
            onSubmit={save}
          />
        </Modal>
      )}
    </section>
  )
}