package com.utils;

import com.englishcenter.member.command.CommandSearchMember;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.BasicDBObject;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.*;
import com.utils.enums.MongodbEnum;
import eu.dozd.mongo.MongoMapper;
import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.types.ObjectId;
import org.springframework.util.CollectionUtils;

import java.util.*;

public class MongoDBConnection<T> {
    private final MongoCollection<T> mongoCollection;

    public MongoDBConnection(String name, Class<T> tClass) {
        ConnectionString connectionString = new ConnectionString(MongodbEnum.connection);
        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(connectionString)
                .build();
        MongoClient mongoClient = MongoClients.create(settings);
        CodecRegistry codecRegistry = CodecRegistries.fromRegistries(MongoClientSettings.getDefaultCodecRegistry(),
                CodecRegistries.fromProviders(MongoMapper.getProviders()));
        MongoDatabase database = mongoClient.getDatabase(MongodbEnum.database_name).withCodecRegistry(codecRegistry);
        mongoCollection = database.getCollection(name, tClass);
    }

    public Optional<List<T>> find(Map<String, Object> query) {
        try {
            return Optional.of(mongoCollection.find(new Document(query)).into(new ArrayList<>()));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<T> findOne(Map<String, Object> query) {
        try {
            List<T> list = mongoCollection.find(new Document(query)).skip(0).limit(1).into(new ArrayList<>());
            if (CollectionUtils.isEmpty(list)) {
                return Optional.empty();
            }
            return Optional.of(list.get(0));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<T> update(String id, T t) {
        try {
            Document data = this.buildQuerySet(t);
            Map<String, Object> query = new HashMap<>();
            query.put("_id", new ObjectId(id));
            return Optional.ofNullable(mongoCollection.findOneAndUpdate(new Document(query), data));
        } catch (Exception e) {
            return Optional.empty();
        }
    }

    public Optional<Boolean> update(Map<String, Object> query, Map<String, Object> data) {
        try {
            return Optional.of(mongoCollection.updateMany(new Document(query), new Document(data)).getModifiedCount() > 0);
        } catch (Exception e) {
            return Optional.of(Boolean.FALSE);
        }
    }

    public Optional<Boolean> delete(String id) {
        try {
            Map<String, Object> query = new HashMap<>();
            query.put("_id", new ObjectId(id));
            query.put("is_deleted", false);
            return Optional.of(mongoCollection.updateMany(new Document(query), new Document("is_deleted", false)).getModifiedCount() > 0);
        } catch (Exception e) {
            return Optional.of(Boolean.FALSE);
        }
    }

    public Optional<Long> count(Map<String, Object> query) {
        try {
            return Optional.of(mongoCollection.count(new Document(query)));
        } catch (Exception e) {
            return Optional.of(0L);
        }
    }

    public Optional<T> insert(T t) {
        mongoCollection.insertOne(t);
        return Optional.of(t);
    }

    public AggregateIterable<Document> aggregate(List<BasicDBObject> basicDBObjects) {
        return mongoCollection.aggregate(new ArrayList<>(basicDBObjects), Document.class).allowDiskUse(true);
    }

    public void drop(Map<String, Object> query) {
        mongoCollection.deleteMany(new Document(query)).getDeletedCount();
    }

    public Optional<Paging<T>> find(Map<String, Object> query, Map<String, Object> sort, int page, int size) {
        try {
            long count = mongoCollection.count(new Document(query));
            if (count > 0) {
                List<T> list = mongoCollection.find(new Document(query)).sort(new Document(sort)).skip((page - 1) * size).limit(size).into(new ArrayList<>());
                return getPaging(page, size, count, (List<T>) list);
            } else {
                throw new Exception();
            }
        } catch (Exception e) {
            return Optional.of(Paging.<T>builder()
                    .items(new ArrayList<>())
                    .next_page(1)
                    .current_page(1)
                    .has_next(false)
                    .has_previous(false)
                    .page_size(size)
                    .previous_page(1)
                    .total_items(0)
                    .total_pages(0)
                    .build());
        }
    }

    public Optional<Paging<T>> find(Map<String, Object> query, CommandSearchMember.Sort sort, int page, int size) {
        try {
            long count = mongoCollection.count(new Document(query));
            if (count > 0) {
                List<T> list = mongoCollection.find(new Document(query)).sort(new Document(sort.getField(), sort.getIs_asc() ? 1 : -1)).skip((page - 1) * size).limit(size).into(new ArrayList<>());
                return getPaging(page, size, count, (List<T>) list);
            } else {
                throw new Exception();
            }
        } catch (Exception e) {
            return Optional.of(Paging.<T>builder()
                    .items(new ArrayList<>())
                    .next_page(1)
                    .current_page(1)
                    .has_next(false)
                    .has_previous(false)
                    .page_size(size)
                    .previous_page(1)
                    .total_items(0)
                    .total_pages(0)
                    .build());
        }
    }

    private Optional<Paging<T>> getPaging(int page, int size, long count, List<T> list) {
        Paging<T> result = Paging.<T>builder()
                .items(list)
                .current_page(page)
                .page_size(size)
                .total_items((int) count)
                .build();
        if (count % size > 0) {
            result.setTotal_pages((int) (count / size) + 1);
        } else {
            result.setTotal_pages((int) (count / size));
        }
        if (result.getCurrent_page() < result.getTotal_pages()) {
            result.setNext_page(result.getCurrent_page() + 1);
            result.setHas_next(true);
        } else {
            result.setNext_page(result.getCurrent_page());
            result.setHas_next(false);
        }
        if (result.getCurrent_page() > 1) {
            result.setPrevious_page(result.getCurrent_page() - 1);
            result.setHas_previous(true);
        } else {
            result.setPrevious_page(result.getCurrent_page());
            result.setHas_previous(false);
        }
        return Optional.of(result);
    }

    private Document buildQuerySet(T t) {
        TypeReference<HashMap<String, Object>> typeRef = new TypeReference<HashMap<String, Object>>() {
        };
        ObjectMapper objectMapper = new ObjectMapper();
        Map<String, Object> data = objectMapper.convertValue(t, typeRef);
        Document queryItem = new Document();
        queryItem.putAll(data);
        Document query = new Document();
        queryItem.remove("_id");
        query.put("$set", queryItem);
        return query;
    }
}
