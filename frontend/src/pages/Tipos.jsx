import CrudPage from '../components/CrudPage'

export default function Tipos() {
  return (
    <CrudPage
      title="Tipos"
      singular="Tipo"
      endpoint="/tipos"
      fields={[
        { name: 'nombre', label: 'Nombre', required: true },
        { name: 'descripcion', label: 'Descripción', type: 'textarea', full: true },
      ]}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'nombre', label: 'Nombre' },
        { key: 'descripcion', label: 'Descripción' },
      ]}
    />
  )
}
