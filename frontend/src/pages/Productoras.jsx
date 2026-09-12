import CrudPage from '../components/CrudPage'

export default function Productoras() {
  return (
    <CrudPage
      title="Productoras"
      singular="Productora"
      endpoint="/productoras"
      fields={[
        { name: 'nombre', label: 'Nombre', required: true },
        { name: 'estado', label: 'Estado', type: 'select', required: true, default: 'Activo', options: [
          { value: 'Activo', label: 'Activo' }, { value: 'Inactivo', label: 'Inactivo' }
        ]},
        { name: 'slogan', label: 'Slogan' },
        { name: 'descripcion', label: 'Descripción', type: 'textarea', full: true },
      ]}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'nombre', label: 'Nombre' },
        { key: 'estado', label: 'Estado' },
        { key: 'slogan', label: 'Slogan' },
      ]}
    />
  )
}
