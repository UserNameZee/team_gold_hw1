package org.gold.stratego.database;
import org.gold.stratego.database.GameRepository;
import org.gold.stratego.database.entities.Game;
import org.gold.stratego.database.entities.Turn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Component
public class GameDB{

    @Autowired
    public GameRepository repo;



}