import React, { ChangeEvent } from 'react';
import { InlineField, Input } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { PRTGDataSourceConfig, PRTGSecureJsonData } from '../types';

interface Props extends DataSourcePluginOptionsEditorProps<PRTGDataSourceConfig, PRTGSecureJsonData> {}

export function ConfigEditor(props: Props) {
  const { onOptionsChange, options } = props;
  const { jsonData } = options;

  // Ortak giriş değişiklik yöneticisi
  const handleInputChange = (field: keyof PRTGDataSourceConfig) => (event: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange({
      ...options,
      jsonData: {
        ...jsonData,
        [field]: event.target.value,
      },
    });
  };

  return (
    <>
      <h2>API Configuration</h2>
      
      <InlineField label="Hostname" labelWidth={20} tooltip="Hostname for the API">
        <Input
          id="config-editor-hostname"
          onChange={handleInputChange('hostname')}
          value={jsonData.hostname || ''}
          placeholder="Enter the hostname, e.g. yourserver"
          width={40}
        />
      </InlineField>

      <InlineField label="Username" labelWidth={20} tooltip="Username for the API">
        <Input
          id="config-editor-username"
          onChange={handleInputChange('username')}
          value={jsonData.username || ''}
          placeholder="Enter the username, e.g. myuser"
          width={40}
        />
      </InlineField>

      <InlineField label="Passhash" labelWidth={20} tooltip="Passhash for the API">
        <Input
          id="config-editor-passhash"
          onChange={handleInputChange('passhash')}
          value={jsonData.passhash || ''}
          placeholder="Enter your passhash"
          type="password"
          width={40}
        />
      </InlineField>

      <InlineField label="Cache Timeout" labelWidth={20} tooltip="Cache timeout in seconds">
        <Input
          type="number"
          id="config-editor-cache-timeout"
          onChange={handleInputChange('cacheTimeout')}
          value={jsonData.cacheTimeout || 300}
          placeholder="Enter cache timeout in seconds"
          width={40}
        />
      </InlineField>
    </>
  );
}
