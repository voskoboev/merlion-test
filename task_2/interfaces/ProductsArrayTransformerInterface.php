<?php

namespace Interfaces;

interface ProductsArrayTransformerInterface
{
  public function getGroupsArray(): array;
  public function getFiltersArray(): array;
  public function transformIntoArchiveStatusGroupsArray(): void;
  public function sortArchiveStatusGroupsArray(string $field): void;
  public function handleFiltersArray(array $filters): void;
}
