import { useEffect, useState } from 'react';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';
import { usePage } from '@inertiajs/react';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { SharedData } from '@/types';
import { error } from 'console';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
interface FileUploadProps {
    handleProcess: any,
    handleRemove?: any,
    resetTrigger: boolean,
    fileProcessingError?: string,
    labelFileProcessingError?: string
}

export default function FileUpload({
    handleProcess,
    handleRemove,
    resetTrigger = false,
    labelFileProcessingError
}: FileUploadProps) {
    const [files, setFiles] = useState([]);
    const { csrf_token } = usePage<SharedData>().props;

    useEffect(() => {
        if (resetTrigger) {
            setFiles([]);
        }
    }, [resetTrigger]);

    return (
        <div>
            <FilePond
                files={files}
                labelFileProcessingError={labelFileProcessingError}
                onupdatefiles={setFiles}
                onprocessfile={handleProcess}
                beforeRemoveFile={handleRemove}
                allowMultiple={true}
                maxFiles={4}
                server={{
                    url: "/upload",
                    revert: null,
                    headers: {
                        'X-CSRF-TOKEN' : csrf_token
                    }
                }}
                name="image"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
        </div>
    );
}