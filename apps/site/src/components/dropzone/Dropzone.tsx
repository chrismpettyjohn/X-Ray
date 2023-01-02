import React from 'react';
import {toast} from 'react-toastify';
import {useDropzone} from 'react-dropzone';
import {DropzoneProps} from './Dropzone.types';
import {Grid} from '@mui/material';

export function Dropzone({
  children,
  files,
  onChange,
  acceptedType,
  height = 200,
  width = '100%',
  style,
}: DropzoneProps) {
  const onDrop = (files: File[]) => {
    files.forEach(file => {
      if (!file.type.includes(acceptedType)) {
        toast.error(`${file.name} is not supported`);
        return;
      }
    });

    onChange(files);
  };

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});
  return (
    <>
      <div
        className="p-4"
        style={{
          border: '1px solid grey',
          borderRadius: 5,
          borderColor: isDragActive ? 'blue' : 'grey',
          display: 'flex',
          alignItems: 'center',
          width,
          height,
          overflow: 'hidden',
          ...style,
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {files.length > 0 ? (
          <Grid container>
            {files.map((file, fileIndex) => (
              <Grid item key={`file_upload_${fileIndex}`} xs={12}>
                <img
                  className="card-img-top"
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  style={{
                    imageRendering: 'crisp-edges',
                    flexShrink: 0,
                    minWidth: '100%',
                    minHeight: '100%',
                  }}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container>
            <Grid item xs={12}>
              {children}
            </Grid>
          </Grid>
        )}
      </div>
    </>
  );
}
