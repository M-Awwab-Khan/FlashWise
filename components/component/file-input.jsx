import { useCallback, useState } from 'react';
import { UploadIcon } from 'lucide-react';

import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function FileInput({ handleFileChange }) {
    const { toast } = useToast()
    const [isDragging, setIsDragging] = useState(false);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        setIsDragging(true);
    }, []);

    const onDragLeave = useCallback((event) => {
        event.preventDefault();
        setIsDragging(false);
    }, []);

    const onDrop = useCallback((event) => {
        event.preventDefault();
        setIsDragging(false);
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            const supportedExtensions = ['.md', '.txt', '.pdf'];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (supportedExtensions.includes(`.${fileExtension}`)) {
                handleFileChange(file);
            } else {
                toast({
                    description: "Unsupported file type. Please upload a markdown (.md), text (.txt), or PDF (.pdf) file.",
                    variant: "destructive",
                });
            }
        }

    }, [handleFileChange]);

    const onChange = useCallback((event) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const supportedExtensions = ['.md', '.txt', '.pdf'];
            const fileExtension = file.name.split('.').pop().toLowerCase();

            if (supportedExtensions.includes(`.${fileExtension}`)) {
                handleFileChange(file);
            } else {
                toast({
                    description: "Unsupported file type. Please upload a markdown (.md), text (.txt), or PDF (.pdf) file.",
                    variant: "destructive",
                });
            }
        }
    }, [handleFileChange]);

    return (
        <div
            // className="relative flex items-center justify-center h-[250px] rounded-md border-2 border-dashed"
            className={`relative flex items-center justify-center h-[250px] rounded-md border-2 border-dashed transition-colors
                ${isDragging ? 'border-primary/10 bg-primary/5' : 'border-border'
                }`}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
        >
            <div className="flex flex-col items-center justify-center space-y-2 m-4">
                <UploadIcon className="mx-auto h-8 w-8 text-primary" />
                <h3 className="text-md font-medium text-center">
                    {isDragging ? 'Drop the file here' : 'Click to upload or drag and drop'}
                </h3>
                <p className="text-sm text-muted-foreground">Supported formats: md, pdf, txt</p>
            </div>
            <Input
                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                type="file"
                accept=".md,.txt,.pdf"
                onChange={onChange}
            />

        </div>
    )
}
