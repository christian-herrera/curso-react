// Utilidades
import { showTextareaReadOnly, showImage } from "../../utils/utilsAlert";


// Imagenes
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import DeleteIcon from '@mui/icons-material/Delete';
import ArticleIcon from '@mui/icons-material/Article';


// ---------------------------------------------------------------------
// --> Component: TableOfProducts.jsx
// Listado de productos (admins)
// ---------------------------------------------------------------------
export default function TableOfProducts({ productList = [], on_delProduct }) {
    // --> RENDERIZADO
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover align-middle table-bordered text-center">
                <thead>
                    <tr>
                        <th className="w-50">Titulo</th>
                        <th className="w-25">Subtitulo</th>
                        <th className="w-25 text-center">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {/* Listado */}
                    {productList && productList.length > 0 ? (
                        productList.map((file) => (
                            <tr key={file.id}>
                                <td>{file.title}</td>
                                <td>{file.subtitle}</td>
                                <td className="text-center">
                                    <ArticleIcon onClick={() => showTextareaReadOnly("Descripción:", file.description)} style={{ cursor: "pointer" }} className="mx-1" />
                                    <InsertPhotoIcon onClick={() => showImage("Vista Previa", file.image)} style={{ cursor: "pointer" }} className="mx-1" />
                                    <DeleteIcon onClick={() => on_delProduct(file.id)} style={{ cursor: "pointer" }} className="mx-1" />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">No hay archivos cargados.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
