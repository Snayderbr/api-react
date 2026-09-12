import CrudPage from '../components/CrudPage'

export default function Directores() {
  return (
    <CrudPage
      title="Directores"
      singular="Director"
      endpoint="/directores"
      fields={[
        { name: 'nombres', label: 'Nombres', required: true },
        { name: 'estado', label: 'Estado', type: 'select', required: true, default: 'Activo', options: [
          { value: 'Activo', label: 'Activo' }, { value: 'Inactivo', label: 'Inactivo' }
        ]},
      ]}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'nombres', label: 'Nombres' },
        { key: 'estado', label: 'Estado' },
      ]}
    />
  )
}
