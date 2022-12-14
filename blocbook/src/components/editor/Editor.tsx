import React, { useCallback } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import { Txn } from './plugins/Txn';
import { Address } from './plugins/Address';
import { Gif } from './plugins/Gif';
import { Section } from '@homenode/jscore/dist/apps/blockbook/Blockbook';

interface EditorProps {
  onNewEditorData?: (data: OutputData) => void
  disabled?: boolean
  blocks?: Section[] 
}

export const Editor = ({ onNewEditorData, disabled = false, blocks =[] }: EditorProps) => {
  
  const editorBlocks = blocks.map(block => {
    console.log("block.data: ", block)
    return {
      type: 'paragraph',
      data: {
        text: (block.data as any).text
      }
    }

  })
   const elemRef = useCallback((node) => {
    if (node !== null) {
      new EditorJS({
        readOnly: disabled,
        data: { blocks: editorBlocks },
        autofocus: false,
        placeholder: blocks.length == 0 ?'Add commentary here...': '',
        holder: node,
        hideToolbar: true,
        tools: {
          txn: Txn,
          Address: Address,
          Gif: Gif,
        },
        onChange: async (api) => {
          const savedData = await api.saver.save() 
          if (onNewEditorData) {
            onNewEditorData(savedData)
          }
        }
      });
    }
  }, [])

  return (
    <div id="editor" ref={elemRef} />
  );
}