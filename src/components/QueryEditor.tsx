import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { QueryEditorProps, SelectableValue } from '@grafana/data';
import { Select, InlineField, Stack, FieldSet } from '@grafana/ui';
import { PRTGDataSource } from '../datasource';
import { PRTGQuery, PRTGDataSourceConfig } from '../types';
import { QueryEditorController } from '../QueryEditorController';

type Props = QueryEditorProps<PRTGDataSource, PRTGQuery, PRTGDataSourceConfig>;

export function QueryEditor({ query, onChange, onRunQuery, datasource }: Props) {
  // Controller'ı useMemo ile yaratıyoruz (performans için)
  const controller = useMemo(
    () => new QueryEditorController(query, datasource, datasource.templateSrv, { refresh: onRunQuery }),
    [query, datasource, onRunQuery]
  );

  // Select listelerini state içinde saklıyoruz
  const [lists, setLists] = useState<Record<string, SelectableValue[]>>({
    groups: [],
    devices: [],
    sensors: [],
    channels: [],
    values: [],
    properties: [],
    filterProperties: [],
  });

  // Controller'dan gelen listeleri güncelleyen fonksiyon
  const refreshLists = useCallback(async () => {
    await controller.refreshSelectionLists();

    const getList = (type: string): SelectableValue[] =>
      (controller.getMetricList(type) || []).map((item) => ({
        label: item.visible_name || item.name,
        value: item.name,
      }));

    setLists({
      groups: getList('group'),
      devices: getList('device'),
      sensors: getList('sensor'),
      channels: getList('channel'),
      values: getList('value'),
      properties: getList('propertyList'),
      filterProperties: getList('filterPropertyList'),
    });
  }, [controller]);

  // İlk render'da listeleri yükle
  useEffect(() => {
    refreshLists();
    return () => controller.dispose();
  }, [refreshLists, controller]);

  // Select değişikliklerini yönetmek için genel bir fonksiyon
  const handleSelectChange = useCallback(
    (field: keyof PRTGQuery, value: SelectableValue<string>) => {
      controller.updateTarget({
        [`${field}Selection`]: { name: value.value || null },
        options: {
          ...controller.getTarget().options,
          [`${field}Name`]: {
            name: value.value || null,
            visible_name: value.label || '',
          },
        },
      });

      refreshLists();
      onChange(controller.getTarget());
      onRunQuery();
    },
    [controller, refreshLists, onChange, onRunQuery]
  );

  const queryTypeOptions = controller.getQueryTypeOptions();
  const target = controller.getTarget();

  return (
    <Stack direction="column" gap={1}>
      <InlineField label="Query Type" labelWidth={20} grow>
        <Select options={queryTypeOptions} value={target.queryType} onChange={(val) => handleSelectChange('queryType', val)} width={47} />
      </InlineField>

      <InlineField label="Group" labelWidth={20} grow>
        <Select
          isLoading={!lists.groups.length}
          options={lists.groups}
          value={target.groupSelection?.name}
          onChange={(val) => handleSelectChange('group', val)}
          width={47}
          allowCustomValue
          isClearable
          placeholder="Select Group"
        />
      </InlineField>

      <InlineField label="Device" labelWidth={20} grow>
        <Select
          isLoading={!lists.devices.length}
          options={lists.devices}
          value={target.deviceSelection?.name}
          onChange={(val) => handleSelectChange('device', val)}
          width={47}
          allowCustomValue
          isClearable
          placeholder="Select Device"
          isDisabled={!target.groupSelection?.name}
        />
      </InlineField>

      <InlineField label="Sensor" labelWidth={20} grow>
        <Select
          isLoading={!lists.sensors.length}
          options={lists.sensors}
          value={target.sensorSelection?.name}
          onChange={(val) => handleSelectChange('sensor', val)}
          width={47}
          allowCustomValue
          isClearable
          placeholder="Select Sensor"
          isDisabled={!target.deviceSelection?.name}
        />
      </InlineField>

      <FieldSet label="Options">
        <Stack direction="row" gap={2}>
          <InlineField label="Property" labelWidth={20}>
            <Select
              width={47}
              value={{
                label: target.options?.propertyName?.visible_name || target.propertySelection?.name,
                value: target.propertySelection?.name || '',
              }}
              isDisabled={!target.sensorSelection?.name}
              onChange={(val) => handleSelectChange('property', val)}
              options={lists.properties}
              placeholder="Select Property"
            />
          </InlineField>
        </Stack>
      </FieldSet>
    </Stack>
  );
}
