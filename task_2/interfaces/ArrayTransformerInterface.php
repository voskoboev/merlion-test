<?php

namespace Interfaces;

interface ArrayTransformerInterface
{
  public function getGroupsArray(): array;
  public function getFiltersArray(): array;
  public function aggregateItemsFields(array $fieldNames, callable $setGroups): void;
  public function sortAggregatedFields(string $field): void;
  public function transformIntoFiltersArray(array $filters): void;
}
